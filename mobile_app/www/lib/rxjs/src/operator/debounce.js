System.register(["../OuterSubscriber", "../util/subscribeToResult"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Emits a value from the source Observable only after a particular time span
     * determined by another Observable has passed without another source emission.
     *
     * <span class="informal">It's like {@link debounceTime}, but the time span of
     * emission silence is determined by a second Observable.</span>
     *
     * <img src="./img/debounce.png" width="100%">
     *
     * `debounce` delays values emitted by the source Observable, but drops previous
     * pending delayed emissions if a new value arrives on the source Observable.
     * This operator keeps track of the most recent value from the source
     * Observable, and spawns a duration Observable by calling the
     * `durationSelector` function. The value is emitted only when the duration
     * Observable emits a value or completes, and if no other value was emitted on
     * the source Observable since the duration Observable was spawned. If a new
     * value appears before the duration Observable emits, the previous value will
     * be dropped and will not be emitted on the output Observable.
     *
     * Like {@link debounceTime}, this is a rate-limiting operator, and also a
     * delay-like operator since output emissions do not necessarily occur at the
     * same time as they did on the source Observable.
     *
     * @example <caption>Emit the most recent click after a burst of clicks</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var result = clicks.debounce(() => Rx.Observable.interval(1000));
     * result.subscribe(x => console.log(x));
     *
     * @see {@link audit}
     * @see {@link debounceTime}
     * @see {@link delayWhen}
     * @see {@link throttle}
     *
     * @param {function(value: T): SubscribableOrPromise} durationSelector A function
     * that receives a value from the source Observable, for computing the timeout
     * duration for each source value, returned as an Observable or a Promise.
     * @return {Observable} An Observable that delays the emissions of the source
     * Observable by the specified duration Observable returned by
     * `durationSelector`, and may drop some values if they occur too frequently.
     * @method debounce
     * @owner Observable
     */
    function debounce(durationSelector) {
        return this.lift(new DebounceOperator(durationSelector));
    }
    exports_1("debounce", debounce);
    var OuterSubscriber_1, subscribeToResult_1, DebounceOperator, DebounceSubscriber;
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
            DebounceOperator = class DebounceOperator {
                constructor(durationSelector) {
                    this.durationSelector = durationSelector;
                }
                call(subscriber, source) {
                    return source.subscribe(new DebounceSubscriber(subscriber, this.durationSelector));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            DebounceSubscriber = class DebounceSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, durationSelector) {
                    super(destination);
                    this.durationSelector = durationSelector;
                    this.hasValue = false;
                    this.durationSubscription = null;
                }
                _next(value) {
                    try {
                        const result = this.durationSelector.call(this, value);
                        if (result) {
                            this._tryNext(value, result);
                        }
                    }
                    catch (err) {
                        this.destination.error(err);
                    }
                }
                _complete() {
                    this.emitValue();
                    this.destination.complete();
                }
                _tryNext(value, duration) {
                    let subscription = this.durationSubscription;
                    this.value = value;
                    this.hasValue = true;
                    if (subscription) {
                        subscription.unsubscribe();
                        this.remove(subscription);
                    }
                    subscription = subscribeToResult_1.subscribeToResult(this, duration);
                    if (!subscription.closed) {
                        this.add(this.durationSubscription = subscription);
                    }
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.emitValue();
                }
                notifyComplete() {
                    this.emitValue();
                }
                emitValue() {
                    if (this.hasValue) {
                        const value = this.value;
                        const subscription = this.durationSubscription;
                        if (subscription) {
                            this.durationSubscription = null;
                            subscription.unsubscribe();
                            this.remove(subscription);
                        }
                        this.value = null;
                        this.hasValue = false;
                        super._next(value);
                    }
                }
            };
        }
    };
});
//# sourceMappingURL=debounce.js.map