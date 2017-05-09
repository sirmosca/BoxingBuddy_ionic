System.register(["../Subject", "../util/tryCatch", "../util/errorObject", "../OuterSubscriber", "../util/subscribeToResult"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Returns an Observable that mirrors the source Observable with the exception of a `complete`. If the source
     * Observable calls `complete`, this method will emit to the Observable returned from `notifier`. If that Observable
     * calls `complete` or `error`, then this method will call `complete` or `error` on the child subscription. Otherwise
     * this method will resubscribe to the source Observable.
     *
     * <img src="./img/repeatWhen.png" width="100%">
     *
     * @param {function(notifications: Observable): Observable} notifier - Receives an Observable of notifications with
     * which a user can `complete` or `error`, aborting the repetition.
     * @return {Observable} The source Observable modified with repeat logic.
     * @method repeatWhen
     * @owner Observable
     */
    function repeatWhen(notifier) {
        return this.lift(new RepeatWhenOperator(notifier));
    }
    exports_1("repeatWhen", repeatWhen);
    var Subject_1, tryCatch_1, errorObject_1, OuterSubscriber_1, subscribeToResult_1, RepeatWhenOperator, RepeatWhenSubscriber;
    return {
        setters: [
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }
        ],
        execute: function () {
            RepeatWhenOperator = class RepeatWhenOperator {
                constructor(notifier) {
                    this.notifier = notifier;
                }
                call(subscriber, source) {
                    return source.subscribe(new RepeatWhenSubscriber(subscriber, this.notifier, source));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            RepeatWhenSubscriber = class RepeatWhenSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, notifier, source) {
                    super(destination);
                    this.notifier = notifier;
                    this.source = source;
                    this.sourceIsBeingSubscribedTo = true;
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.sourceIsBeingSubscribedTo = true;
                    this.source.subscribe(this);
                }
                notifyComplete(innerSub) {
                    if (this.sourceIsBeingSubscribedTo === false) {
                        return super.complete();
                    }
                }
                complete() {
                    this.sourceIsBeingSubscribedTo = false;
                    if (!this.isStopped) {
                        if (!this.retries) {
                            this.subscribeToRetries();
                        }
                        else if (this.retriesSubscription.closed) {
                            return super.complete();
                        }
                        this._unsubscribeAndRecycle();
                        this.notifications.next();
                    }
                }
                _unsubscribe() {
                    const { notifications, retriesSubscription } = this;
                    if (notifications) {
                        notifications.unsubscribe();
                        this.notifications = null;
                    }
                    if (retriesSubscription) {
                        retriesSubscription.unsubscribe();
                        this.retriesSubscription = null;
                    }
                    this.retries = null;
                }
                _unsubscribeAndRecycle() {
                    const { notifications, retries, retriesSubscription } = this;
                    this.notifications = null;
                    this.retries = null;
                    this.retriesSubscription = null;
                    super._unsubscribeAndRecycle();
                    this.notifications = notifications;
                    this.retries = retries;
                    this.retriesSubscription = retriesSubscription;
                    return this;
                }
                subscribeToRetries() {
                    this.notifications = new Subject_1.Subject();
                    const retries = tryCatch_1.tryCatch(this.notifier)(this.notifications);
                    if (retries === errorObject_1.errorObject) {
                        return super.complete();
                    }
                    this.retries = retries;
                    this.retriesSubscription = subscribeToResult_1.subscribeToResult(this, retries);
                }
            };
        }
    };
});
//# sourceMappingURL=repeatWhen.js.map