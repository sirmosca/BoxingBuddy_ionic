System.register(["../OuterSubscriber", "../util/subscribeToResult"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Converts a higher-order Observable into a first-order Observable by dropping
     * inner Observables while the previous inner Observable has not yet completed.
     *
     * <span class="informal">Flattens an Observable-of-Observables by dropping the
     * next inner Observables while the current inner is still executing.</span>
     *
     * <img src="./img/exhaust.png" width="100%">
     *
     * `exhaust` subscribes to an Observable that emits Observables, also known as a
     * higher-order Observable. Each time it observes one of these emitted inner
     * Observables, the output Observable begins emitting the items emitted by that
     * inner Observable. So far, it behaves like {@link mergeAll}. However,
     * `exhaust` ignores every new inner Observable if the previous Observable has
     * not yet completed. Once that one completes, it will accept and flatten the
     * next inner Observable and repeat this process.
     *
     * @example <caption>Run a finite timer for each click, only if there is no currently active timer</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
     * var result = higherOrder.exhaust();
     * result.subscribe(x => console.log(x));
     *
     * @see {@link combineAll}
     * @see {@link concatAll}
     * @see {@link switch}
     * @see {@link mergeAll}
     * @see {@link exhaustMap}
     * @see {@link zipAll}
     *
     * @return {Observable} An Observable that takes a source of Observables and propagates the first observable
     * exclusively until it completes before subscribing to the next.
     * @method exhaust
     * @owner Observable
     */
    function exhaust() {
        return this.lift(new SwitchFirstOperator());
    }
    exports_1("exhaust", exhaust);
    var OuterSubscriber_1, subscribeToResult_1, SwitchFirstOperator, SwitchFirstSubscriber;
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
            SwitchFirstOperator = class SwitchFirstOperator {
                call(subscriber, source) {
                    return source.subscribe(new SwitchFirstSubscriber(subscriber));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            SwitchFirstSubscriber = class SwitchFirstSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination) {
                    super(destination);
                    this.hasCompleted = false;
                    this.hasSubscription = false;
                }
                _next(value) {
                    if (!this.hasSubscription) {
                        this.hasSubscription = true;
                        this.add(subscribeToResult_1.subscribeToResult(this, value));
                    }
                }
                _complete() {
                    this.hasCompleted = true;
                    if (!this.hasSubscription) {
                        this.destination.complete();
                    }
                }
                notifyComplete(innerSub) {
                    this.remove(innerSub);
                    this.hasSubscription = false;
                    if (this.hasCompleted) {
                        this.destination.complete();
                    }
                }
            };
        }
    };
});
//# sourceMappingURL=exhaust.js.map