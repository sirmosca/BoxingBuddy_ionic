System.register(["../OuterSubscriber", "../util/subscribeToResult"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Emits the most recently emitted value from the source Observable whenever
     * another Observable, the `notifier`, emits.
     *
     * <span class="informal">It's like {@link sampleTime}, but samples whenever
     * the `notifier` Observable emits something.</span>
     *
     * <img src="./img/sample.png" width="100%">
     *
     * Whenever the `notifier` Observable emits a value or completes, `sample`
     * looks at the source Observable and emits whichever value it has most recently
     * emitted since the previous sampling, unless the source has not emitted
     * anything since the previous sampling. The `notifier` is subscribed to as soon
     * as the output Observable is subscribed.
     *
     * @example <caption>On every click, sample the most recent "seconds" timer</caption>
     * var seconds = Rx.Observable.interval(1000);
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var result = seconds.sample(clicks);
     * result.subscribe(x => console.log(x));
     *
     * @see {@link audit}
     * @see {@link debounce}
     * @see {@link sampleTime}
     * @see {@link throttle}
     *
     * @param {Observable<any>} notifier The Observable to use for sampling the
     * source Observable.
     * @return {Observable<T>} An Observable that emits the results of sampling the
     * values emitted by the source Observable whenever the notifier Observable
     * emits value or completes.
     * @method sample
     * @owner Observable
     */
    function sample(notifier) {
        return this.lift(new SampleOperator(notifier));
    }
    exports_1("sample", sample);
    var OuterSubscriber_1, subscribeToResult_1, SampleOperator, SampleSubscriber;
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
            SampleOperator = class SampleOperator {
                constructor(notifier) {
                    this.notifier = notifier;
                }
                call(subscriber, source) {
                    const sampleSubscriber = new SampleSubscriber(subscriber);
                    const subscription = source.subscribe(sampleSubscriber);
                    subscription.add(subscribeToResult_1.subscribeToResult(sampleSubscriber, this.notifier));
                    return subscription;
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            SampleSubscriber = class SampleSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor() {
                    super(...arguments);
                    this.hasValue = false;
                }
                _next(value) {
                    this.value = value;
                    this.hasValue = true;
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.emitValue();
                }
                notifyComplete() {
                    this.emitValue();
                }
                emitValue() {
                    if (this.hasValue) {
                        this.hasValue = false;
                        this.destination.next(this.value);
                    }
                }
            };
        }
    };
});
//# sourceMappingURL=sample.js.map