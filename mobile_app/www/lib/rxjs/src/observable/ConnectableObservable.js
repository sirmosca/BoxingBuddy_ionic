System.register(["../Subject", "../Observable", "../Subscriber", "../Subscription"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subject_1, Observable_1, Subscriber_1, Subscription_1, ConnectableObservable, connectableObservableDescriptor, ConnectableSubscriber, RefCountOperator, RefCountSubscriber;
    return {
        setters: [
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            }
        ],
        execute: function () {
            /**
             * @class ConnectableObservable<T>
             */
            ConnectableObservable = class ConnectableObservable extends Observable_1.Observable {
                constructor(source, subjectFactory) {
                    super();
                    this.source = source;
                    this.subjectFactory = subjectFactory;
                    this._refCount = 0;
                }
                _subscribe(subscriber) {
                    return this.getSubject().subscribe(subscriber);
                }
                getSubject() {
                    const subject = this._subject;
                    if (!subject || subject.isStopped) {
                        this._subject = this.subjectFactory();
                    }
                    return this._subject;
                }
                connect() {
                    let connection = this._connection;
                    if (!connection) {
                        connection = this._connection = new Subscription_1.Subscription();
                        connection.add(this.source
                            .subscribe(new ConnectableSubscriber(this.getSubject(), this)));
                        if (connection.closed) {
                            this._connection = null;
                            connection = Subscription_1.Subscription.EMPTY;
                        }
                        else {
                            this._connection = connection;
                        }
                    }
                    return connection;
                }
                refCount() {
                    return this.lift(new RefCountOperator(this));
                }
            };
            exports_1("ConnectableObservable", ConnectableObservable);
            exports_1("connectableObservableDescriptor", connectableObservableDescriptor = {
                operator: { value: null },
                _refCount: { value: 0, writable: true },
                _subject: { value: null, writable: true },
                _connection: { value: null, writable: true },
                _subscribe: { value: ConnectableObservable.prototype._subscribe },
                getSubject: { value: ConnectableObservable.prototype.getSubject },
                connect: { value: ConnectableObservable.prototype.connect },
                refCount: { value: ConnectableObservable.prototype.refCount }
            });
            ConnectableSubscriber = class ConnectableSubscriber extends Subject_1.SubjectSubscriber {
                constructor(destination, connectable) {
                    super(destination);
                    this.connectable = connectable;
                }
                _error(err) {
                    this._unsubscribe();
                    super._error(err);
                }
                _complete() {
                    this._unsubscribe();
                    super._complete();
                }
                _unsubscribe() {
                    const { connectable } = this;
                    if (connectable) {
                        this.connectable = null;
                        const connection = connectable._connection;
                        connectable._refCount = 0;
                        connectable._subject = null;
                        connectable._connection = null;
                        if (connection) {
                            connection.unsubscribe();
                        }
                    }
                }
            };
            RefCountOperator = class RefCountOperator {
                constructor(connectable) {
                    this.connectable = connectable;
                }
                call(subscriber, source) {
                    const { connectable } = this;
                    connectable._refCount++;
                    const refCounter = new RefCountSubscriber(subscriber, connectable);
                    const subscription = source.subscribe(refCounter);
                    if (!refCounter.closed) {
                        refCounter.connection = connectable.connect();
                    }
                    return subscription;
                }
            };
            RefCountSubscriber = class RefCountSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, connectable) {
                    super(destination);
                    this.connectable = connectable;
                }
                _unsubscribe() {
                    const { connectable } = this;
                    if (!connectable) {
                        this.connection = null;
                        return;
                    }
                    this.connectable = null;
                    const refCount = connectable._refCount;
                    if (refCount <= 0) {
                        this.connection = null;
                        return;
                    }
                    connectable._refCount = refCount - 1;
                    if (refCount > 1) {
                        this.connection = null;
                        return;
                    }
                    ///
                    // Compare the local RefCountSubscriber's connection Subscription to the
                    // connection Subscription on the shared ConnectableObservable. In cases
                    // where the ConnectableObservable source synchronously emits values, and
                    // the RefCountSubscriber's downstream Observers synchronously unsubscribe,
                    // execution continues to here before the RefCountOperator has a chance to
                    // supply the RefCountSubscriber with the shared connection Subscription.
                    // For example:
                    // ```
                    // Observable.range(0, 10)
                    //   .publish()
                    //   .refCount()
                    //   .take(5)
                    //   .subscribe();
                    // ```
                    // In order to account for this case, RefCountSubscriber should only dispose
                    // the ConnectableObservable's shared connection Subscription if the
                    // connection Subscription exists, *and* either:
                    //   a. RefCountSubscriber doesn't have a reference to the shared connection
                    //      Subscription yet, or,
                    //   b. RefCountSubscriber's connection Subscription reference is identical
                    //      to the shared connection Subscription
                    ///
                    const { connection } = this;
                    const sharedConnection = connectable._connection;
                    this.connection = null;
                    if (sharedConnection && (!connection || sharedConnection === connection)) {
                        sharedConnection.unsubscribe();
                    }
                }
            };
        }
    };
});
//# sourceMappingURL=ConnectableObservable.js.map