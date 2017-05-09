System.register(["../scheduler/async", "../util/isDate", "../OuterSubscriber", "../util/subscribeToResult"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /* tslint:enable:max-line-length */
    /**
     * @param due
     * @param withObservable
     * @param scheduler
     * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
     * @method timeoutWith
     * @owner Observable
     */
    function timeoutWith(due, withObservable, scheduler = async_1.async) {
        let absoluteTimeout = isDate_1.isDate(due);
        let waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(due);
        return this.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
    }
    exports_1("timeoutWith", timeoutWith);
    var async_1, isDate_1, OuterSubscriber_1, subscribeToResult_1, TimeoutWithOperator, TimeoutWithSubscriber;
    return {
        setters: [
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (isDate_1_1) {
                isDate_1 = isDate_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }
        ],
        execute: function () {
            TimeoutWithOperator = class TimeoutWithOperator {
                constructor(waitFor, absoluteTimeout, withObservable, scheduler) {
                    this.waitFor = waitFor;
                    this.absoluteTimeout = absoluteTimeout;
                    this.withObservable = withObservable;
                    this.scheduler = scheduler;
                }
                call(subscriber, source) {
                    return source.subscribe(new TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            TimeoutWithSubscriber = class TimeoutWithSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
                    super(destination);
                    this.absoluteTimeout = absoluteTimeout;
                    this.waitFor = waitFor;
                    this.withObservable = withObservable;
                    this.scheduler = scheduler;
                    this.action = null;
                    this.scheduleTimeout();
                }
                static dispatchTimeout(subscriber) {
                    const { withObservable } = subscriber;
                    subscriber._unsubscribeAndRecycle();
                    subscriber.add(subscribeToResult_1.subscribeToResult(subscriber, withObservable));
                }
                scheduleTimeout() {
                    const { action } = this;
                    if (action) {
                        // Recycle the action if we've already scheduled one. All the production
                        // Scheduler Actions mutate their state/delay time and return themeselves.
                        // VirtualActions are immutable, so they create and return a clone. In this
                        // case, we need to set the action reference to the most recent VirtualAction,
                        // to ensure that's the one we clone from next time.
                        this.action = action.schedule(this, this.waitFor);
                    }
                    else {
                        this.add(this.action = this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, this));
                    }
                }
                _next(value) {
                    if (!this.absoluteTimeout) {
                        this.scheduleTimeout();
                    }
                    super._next(value);
                }
                _unsubscribe() {
                    this.action = null;
                    this.scheduler = null;
                    this.withObservable = null;
                }
            };
        }
    };
});
//# sourceMappingURL=timeoutWith.js.map