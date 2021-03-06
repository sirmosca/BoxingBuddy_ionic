System.register(["../Subscriber", "../scheduler/async"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Emits a value from the source Observable, then ignores subsequent source
     * values for `duration` milliseconds, then repeats this process.
     *
     * <span class="informal">Lets a value pass, then ignores source values for the
     * next `duration` milliseconds.</span>
     *
     * <img src="./img/throttleTime.png" width="100%">
     *
     * `throttleTime` emits the source Observable values on the output Observable
     * when its internal timer is disabled, and ignores source values when the timer
     * is enabled. Initially, the timer is disabled. As soon as the first source
     * value arrives, it is forwarded to the output Observable, and then the timer
     * is enabled. After `duration` milliseconds (or the time unit determined
     * internally by the optional `scheduler`) has passed, the timer is disabled,
     * and this process repeats for the next source value. Optionally takes a
     * {@link IScheduler} for managing timers.
     *
     * @example <caption>Emit clicks at a rate of at most one click per second</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var result = clicks.throttleTime(1000);
     * result.subscribe(x => console.log(x));
     *
     * @see {@link auditTime}
     * @see {@link debounceTime}
     * @see {@link delay}
     * @see {@link sampleTime}
     * @see {@link throttle}
     *
     * @param {number} duration Time to wait before emitting another value after
     * emitting the last value, measured in milliseconds or the time unit determined
     * internally by the optional `scheduler`.
     * @param {Scheduler} [scheduler=async] The {@link IScheduler} to use for
     * managing the timers that handle the sampling.
     * @return {Observable<T>} An Observable that performs the throttle operation to
     * limit the rate of emissions from the source.
     * @method throttleTime
     * @owner Observable
     */
    function throttleTime(duration, scheduler = async_1.async) {
        return this.lift(new ThrottleTimeOperator(duration, scheduler));
    }
    exports_1("throttleTime", throttleTime);
    function dispatchNext(arg) {
        const { subscriber } = arg;
        subscriber.clearThrottle();
    }
    var Subscriber_1, async_1, ThrottleTimeOperator, ThrottleTimeSubscriber;
    return {
        setters: [
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }
        ],
        execute: function () {
            ThrottleTimeOperator = class ThrottleTimeOperator {
                constructor(duration, scheduler) {
                    this.duration = duration;
                    this.scheduler = scheduler;
                }
                call(subscriber, source) {
                    return source.subscribe(new ThrottleTimeSubscriber(subscriber, this.duration, this.scheduler));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            ThrottleTimeSubscriber = class ThrottleTimeSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, duration, scheduler) {
                    super(destination);
                    this.duration = duration;
                    this.scheduler = scheduler;
                }
                _next(value) {
                    if (!this.throttled) {
                        this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.duration, { subscriber: this }));
                        this.destination.next(value);
                    }
                }
                clearThrottle() {
                    const throttled = this.throttled;
                    if (throttled) {
                        throttled.unsubscribe();
                        this.remove(throttled);
                        this.throttled = null;
                    }
                }
            };
        }
    };
});
//# sourceMappingURL=throttleTime.js.map