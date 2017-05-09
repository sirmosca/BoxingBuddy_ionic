System.register(["./Observable", "./Subscriber", "./Subscription", "./util/ObjectUnsubscribedError", "./SubjectSubscription", "./symbol/rxSubscriber"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, Subscriber_1, Subscription_1, ObjectUnsubscribedError_1, SubjectSubscription_1, rxSubscriber_1, SubjectSubscriber, Subject, AnonymousSubject;
    return {
        setters: [
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            },
            function (ObjectUnsubscribedError_1_1) {
                ObjectUnsubscribedError_1 = ObjectUnsubscribedError_1_1;
            },
            function (SubjectSubscription_1_1) {
                SubjectSubscription_1 = SubjectSubscription_1_1;
            },
            function (rxSubscriber_1_1) {
                rxSubscriber_1 = rxSubscriber_1_1;
            }
        ],
        execute: function () {
            /**
             * @class SubjectSubscriber<T>
             */
            SubjectSubscriber = class SubjectSubscriber extends Subscriber_1.Subscriber {
                constructor(destination) {
                    super(destination);
                    this.destination = destination;
                }
            };
            exports_1("SubjectSubscriber", SubjectSubscriber);
            /**
             * @class Subject<T>
             */
            Subject = class Subject extends Observable_1.Observable {
                constructor() {
                    super();
                    this.observers = [];
                    this.closed = false;
                    this.isStopped = false;
                    this.hasError = false;
                    this.thrownError = null;
                }
                [rxSubscriber_1.rxSubscriber]() {
                    return new SubjectSubscriber(this);
                }
                lift(operator) {
                    const subject = new AnonymousSubject(this, this);
                    subject.operator = operator;
                    return subject;
                }
                next(value) {
                    if (this.closed) {
                        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                    }
                    if (!this.isStopped) {
                        const { observers } = this;
                        const len = observers.length;
                        const copy = observers.slice();
                        for (let i = 0; i < len; i++) {
                            copy[i].next(value);
                        }
                    }
                }
                error(err) {
                    if (this.closed) {
                        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                    }
                    this.hasError = true;
                    this.thrownError = err;
                    this.isStopped = true;
                    const { observers } = this;
                    const len = observers.length;
                    const copy = observers.slice();
                    for (let i = 0; i < len; i++) {
                        copy[i].error(err);
                    }
                    this.observers.length = 0;
                }
                complete() {
                    if (this.closed) {
                        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                    }
                    this.isStopped = true;
                    const { observers } = this;
                    const len = observers.length;
                    const copy = observers.slice();
                    for (let i = 0; i < len; i++) {
                        copy[i].complete();
                    }
                    this.observers.length = 0;
                }
                unsubscribe() {
                    this.isStopped = true;
                    this.closed = true;
                    this.observers = null;
                }
                _trySubscribe(subscriber) {
                    if (this.closed) {
                        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                    }
                    else {
                        return super._trySubscribe(subscriber);
                    }
                }
                _subscribe(subscriber) {
                    if (this.closed) {
                        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                    }
                    else if (this.hasError) {
                        subscriber.error(this.thrownError);
                        return Subscription_1.Subscription.EMPTY;
                    }
                    else if (this.isStopped) {
                        subscriber.complete();
                        return Subscription_1.Subscription.EMPTY;
                    }
                    else {
                        this.observers.push(subscriber);
                        return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
                    }
                }
                asObservable() {
                    const observable = new Observable_1.Observable();
                    observable.source = this;
                    return observable;
                }
            };
            Subject.create = (destination, source) => {
                return new AnonymousSubject(destination, source);
            };
            exports_1("Subject", Subject);
            /**
             * @class AnonymousSubject<T>
             */
            AnonymousSubject = class AnonymousSubject extends Subject {
                constructor(destination, source) {
                    super();
                    this.destination = destination;
                    this.source = source;
                }
                next(value) {
                    const { destination } = this;
                    if (destination && destination.next) {
                        destination.next(value);
                    }
                }
                error(err) {
                    const { destination } = this;
                    if (destination && destination.error) {
                        this.destination.error(err);
                    }
                }
                complete() {
                    const { destination } = this;
                    if (destination && destination.complete) {
                        this.destination.complete();
                    }
                }
                _subscribe(subscriber) {
                    const { source } = this;
                    if (source) {
                        return this.source.subscribe(subscriber);
                    }
                    else {
                        return Subscription_1.Subscription.EMPTY;
                    }
                }
            };
            exports_1("AnonymousSubject", AnonymousSubject);
        }
    };
});
//# sourceMappingURL=Subject.js.map