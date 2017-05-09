System.register(["../OuterSubscriber", "../util/subscribeToResult"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Emits a value from the source Observable, then ignores subsequent source
     * values for a duration determined by another Observable, then repeats this
     * process.
     *
     * <span class="informal">It's like {@link throttleTime}, but the silencing
     * duration is determined by a second Observable.</span>
     *
     * <img src="./img/throttle.png" width="100%">
     *
     * `throttle` emits the source Observable values on the output Observable
     * when its internal timer is disabled, and ignores source values when the timer
     * is enabled. Initially, the timer is disabled. As soon as the first source
     * value arrives, it is forwarded to the output Observable, and then the timer
     * is enabled by calling the `durationSelector` function with the source value,
     * which returns the "duration" Observable. When the duration Observable emits a
     * value or completes, the timer is disabled, and this process repeats for the
     * next source value.
     *
     * @example <caption>Emit clicks at a rate of at most one click per second</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var result = clicks.throttle(ev => Rx.Observable.interval(1000));
     * result.subscribe(x => console.log(x));
     *
     * @see {@link audit}
     * @see {@link debounce}
     * @see {@link delayWhen}
     * @see {@link sample}
     * @see {@link throttleTime}
     *
     * @param {function(value: T): SubscribableOrPromise} durationSelector A function
     * that receives a value from the source Observable, for computing the silencing
     * duration for each source value, returned as an Observable or a Promise.
     * @return {Observable<T>} An Observable that performs the throttle operation to
     * limit the rate of emissions from the source.
     * @method throttle
     * @owner Observable
     */
    function throttle(durationSelector) {
        return this.lift(new ThrottleOperator(durationSelector));
    }
    exports_1("throttle", throttle);
    var OuterSubscriber_1, subscribeToResult_1, ThrottleOperator, ThrottleSubscriber;
    return {
        setters: [
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }
        ],
        execute: function () {
            ThrottleOperator = class ThrottleOperator {
                constructor(durationSelector) {
                    this.durationSelector = durationSelector;
                }
                call(subscriber, source) {
                    return source.subscribe(new ThrottleSubscriber(subscriber, this.durationSelector));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            ThrottleSubscriber = class ThrottleSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, durationSelector) {
                    super(destination);
                    this.destination = destination;
                    this.durationSelector = durationSelector;
                }
                _next(value) {
                    if (!this.throttled) {
                        this.tryDurationSelector(value);
                    }
                }
                tryDurationSelector(value) {
                    let duration = null;
                    try {
                        duration = this.durationSelector(value);
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    this.emitAndThrottle(value, duration);
                }
                emitAndThrottle(value, duration) {
                    this.add(this.throttled = subscribeToResult_1.subscribeToResult(this, duration));
                    this.destination.next(value);
                }
                _unsubscribe() {
                    const throttled = this.throttled;
                    if (throttled) {
                        this.remove(throttled);
                        this.throttled = null;
                        throttled.unsubscribe();
                    }
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this._unsubscribe();
                }
                notifyComplete() {
                    this._unsubscribe();
                }
            };
        }
    };
});
//# sourceMappingURL=throttle.js.map