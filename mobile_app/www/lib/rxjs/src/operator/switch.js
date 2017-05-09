System.register(["../OuterSubscriber", "../util/subscribeToResult"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Converts a higher-order Observable into a first-order Observable by
     * subscribing to only the most recently emitted of those inner Observables.
     *
     * <span class="informal">Flattens an Observable-of-Observables by dropping the
     * previous inner Observable once a new one appears.</span>
     *
     * <img src="./img/switch.png" width="100%">
     *
     * `switch` subscribes to an Observable that emits Observables, also known as a
     * higher-order Observable. Each time it observes one of these emitted inner
     * Observables, the output Observable subscribes to the inner Observable and
     * begins emitting the items emitted by that. So far, it behaves
     * like {@link mergeAll}. However, when a new inner Observable is emitted,
     * `switch` unsubscribes from the earlier-emitted inner Observable and
     * subscribes to the new inner Observable and begins emitting items from it. It
     * continues to behave like this for subsequent inner Observables.
     *
     * @example <caption>Rerun an interval Observable on every click event</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * // Each click event is mapped to an Observable that ticks every second
     * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
     * var switched = higherOrder.switch();
     * // The outcome is that `switched` is essentially a timer that restarts
     * // on every click. The interval Observables from older clicks do not merge
     * // with the current interval Observable.
     * switched.subscribe(x => console.log(x));
     *
     * @see {@link combineAll}
     * @see {@link concatAll}
     * @see {@link exhaust}
     * @see {@link mergeAll}
     * @see {@link switchMap}
     * @see {@link switchMapTo}
     * @see {@link zipAll}
     *
     * @return {Observable<T>} An Observable that emits the items emitted by the
     * Observable most recently emitted by the source Observable.
     * @method switch
     * @name switch
     * @owner Observable
     */
    function _switch() {
        return this.lift(new SwitchOperator());
    }
    exports_1("_switch", _switch);
    var OuterSubscriber_1, subscribeToResult_1, SwitchOperator, SwitchSubscriber;
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
            SwitchOperator = class SwitchOperator {
                call(subscriber, source) {
                    return source.subscribe(new SwitchSubscriber(subscriber));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            SwitchSubscriber = class SwitchSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination) {
                    super(destination);
                    this.active = 0;
                    this.hasCompleted = false;
                }
                _next(value) {
                    this.unsubscribeInner();
                    this.active++;
                    this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, value));
                }
                _complete() {
                    this.hasCompleted = true;
                    if (this.active === 0) {
                        this.destination.complete();
                    }
                }
                unsubscribeInner() {
                    this.active = this.active > 0 ? this.active - 1 : 0;
                    const innerSubscription = this.innerSubscription;
                    if (innerSubscription) {
                        innerSubscription.unsubscribe();
                        this.remove(innerSubscription);
                    }
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.destination.next(innerValue);
                }
                notifyError(err) {
                    this.destination.error(err);
                }
                notifyComplete() {
                    this.unsubscribeInner();
                    if (this.hasCompleted && this.active === 0) {
                        this.destination.complete();
                    }
                }
            };
        }
    };
});
//# sourceMappingURL=switch.js.map