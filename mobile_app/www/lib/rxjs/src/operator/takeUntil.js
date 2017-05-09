System.register(["../OuterSubscriber", "../util/subscribeToResult"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Emits the values emitted by the source Observable until a `notifier`
     * Observable emits a value.
     *
     * <span class="informal">Lets values pass until a second Observable,
     * `notifier`, emits something. Then, it completes.</span>
     *
     * <img src="./img/takeUntil.png" width="100%">
     *
     * `takeUntil` subscribes and begins mirroring the source Observable. It also
     * monitors a second Observable, `notifier` that you provide. If the `notifier`
     * emits a value or a complete notification, the output Observable stops
     * mirroring the source Observable and completes.
     *
     * @example <caption>Tick every second until the first click happens</caption>
     * var interval = Rx.Observable.interval(1000);
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var result = interval.takeUntil(clicks);
     * result.subscribe(x => console.log(x));
     *
     * @see {@link take}
     * @see {@link takeLast}
     * @see {@link takeWhile}
     * @see {@link skip}
     *
     * @param {Observable} notifier The Observable whose first emitted value will
     * cause the output Observable of `takeUntil` to stop emitting values from the
     * source Observable.
     * @return {Observable<T>} An Observable that emits the values from the source
     * Observable until such time as `notifier` emits its first value.
     * @method takeUntil
     * @owner Observable
     */
    function takeUntil(notifier) {
        return this.lift(new TakeUntilOperator(notifier));
    }
    exports_1("takeUntil", takeUntil);
    var OuterSubscriber_1, subscribeToResult_1, TakeUntilOperator, TakeUntilSubscriber;
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
            TakeUntilOperator = class TakeUntilOperator {
                constructor(notifier) {
                    this.notifier = notifier;
                }
                call(subscriber, source) {
                    return source.subscribe(new TakeUntilSubscriber(subscriber, this.notifier));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            TakeUntilSubscriber = class TakeUntilSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, notifier) {
                    super(destination);
                    this.notifier = notifier;
                    this.add(subscribeToResult_1.subscribeToResult(this, notifier));
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.complete();
                }
                notifyComplete() {
                    // noop
                }
            };
        }
    };
});
//# sourceMappingURL=takeUntil.js.map