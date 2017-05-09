System.register(["../Subject", "../util/tryCatch", "../util/errorObject", "../OuterSubscriber", "../util/subscribeToResult"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Returns an Observable that mirrors the source Observable with the exception of an `error`. If the source Observable
     * calls `error`, this method will emit the Throwable that caused the error to the Observable returned from `notifier`.
     * If that Observable calls `complete` or `error` then this method will call `complete` or `error` on the child
     * subscription. Otherwise this method will resubscribe to the source Observable.
     *
     * <img src="./img/retryWhen.png" width="100%">
     *
     * @param {function(errors: Observable): Observable} notifier - Receives an Observable of notifications with which a
     * user can `complete` or `error`, aborting the retry.
     * @return {Observable} The source Observable modified with retry logic.
     * @method retryWhen
     * @owner Observable
     */
    function retryWhen(notifier) {
        return this.lift(new RetryWhenOperator(notifier, this));
    }
    exports_1("retryWhen", retryWhen);
    var Subject_1, tryCatch_1, errorObject_1, OuterSubscriber_1, subscribeToResult_1, RetryWhenOperator, RetryWhenSubscriber;
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
            RetryWhenOperator = class RetryWhenOperator {
                constructor(notifier, source) {
                    this.notifier = notifier;
                    this.source = source;
                }
                call(subscriber, source) {
                    return source.subscribe(new RetryWhenSubscriber(subscriber, this.notifier, this.source));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            RetryWhenSubscriber = class RetryWhenSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, notifier, source) {
                    super(destination);
                    this.notifier = notifier;
                    this.source = source;
                }
                error(err) {
                    if (!this.isStopped) {
                        let errors = this.errors;
                        let retries = this.retries;
                        let retriesSubscription = this.retriesSubscription;
                        if (!retries) {
                            errors = new Subject_1.Subject();
                            retries = tryCatch_1.tryCatch(this.notifier)(errors);
                            if (retries === errorObject_1.errorObject) {
                                return super.error(errorObject_1.errorObject.e);
                            }
                            retriesSubscription = subscribeToResult_1.subscribeToResult(this, retries);
                        }
                        else {
                            this.errors = null;
                            this.retriesSubscription = null;
                        }
                        this._unsubscribeAndRecycle();
                        this.errors = errors;
                        this.retries = retries;
                        this.retriesSubscription = retriesSubscription;
                        errors.next(err);
                    }
                }
                _unsubscribe() {
                    const { errors, retriesSubscription } = this;
                    if (errors) {
                        errors.unsubscribe();
                        this.errors = null;
                    }
                    if (retriesSubscription) {
                        retriesSubscription.unsubscribe();
                        this.retriesSubscription = null;
                    }
                    this.retries = null;
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    const { errors, retries, retriesSubscription } = this;
                    this.errors = null;
                    this.retries = null;
                    this.retriesSubscription = null;
                    this._unsubscribeAndRecycle();
                    this.errors = errors;
                    this.retries = retries;
                    this.retriesSubscription = retriesSubscription;
                    this.source.subscribe(this);
                }
            };
        }
    };
});
//# sourceMappingURL=retryWhen.js.map