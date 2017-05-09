System.register(["../scheduler/async", "../util/isDate", "../Subscriber", "../util/TimeoutError"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * @param {number} due
     * @param {Scheduler} [scheduler]
     * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
     * @method timeout
     * @owner Observable
     */
    function timeout(due, scheduler = async_1.async) {
        const absoluteTimeout = isDate_1.isDate(due);
        const waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(due);
        return this.lift(new TimeoutOperator(waitFor, absoluteTimeout, scheduler, new TimeoutError_1.TimeoutError()));
    }
    exports_1("timeout", timeout);
    var async_1, isDate_1, Subscriber_1, TimeoutError_1, TimeoutOperator, TimeoutSubscriber;
    return {
        setters: [
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (isDate_1_1) {
                isDate_1 = isDate_1_1;
            },
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (TimeoutError_1_1) {
                TimeoutError_1 = TimeoutError_1_1;
            }
        ],
        execute: function () {
            TimeoutOperator = class TimeoutOperator {
                constructor(waitFor, absoluteTimeout, scheduler, errorInstance) {
                    this.waitFor = waitFor;
                    this.absoluteTimeout = absoluteTimeout;
                    this.scheduler = scheduler;
                    this.errorInstance = errorInstance;
                }
                call(subscriber, source) {
                    return source.subscribe(new TimeoutSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.scheduler, this.errorInstance));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            TimeoutSubscriber = class TimeoutSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, absoluteTimeout, waitFor, scheduler, errorInstance) {
                    super(destination);
                    this.absoluteTimeout = absoluteTimeout;
                    this.waitFor = waitFor;
                    this.scheduler = scheduler;
                    this.errorInstance = errorInstance;
                    this.action = null;
                    this.scheduleTimeout();
                }
                static dispatchTimeout(subscriber) {
                    subscriber.error(subscriber.errorInstance);
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
                        this.add(this.action = this.scheduler.schedule(TimeoutSubscriber.dispatchTimeout, this.waitFor, this));
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
                    this.errorInstance = null;
                }
            };
        }
    };
});
//# sourceMappingURL=timeout.js.map