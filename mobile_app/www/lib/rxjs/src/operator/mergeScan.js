System.register(["../util/tryCatch", "../util/errorObject", "../util/subscribeToResult", "../OuterSubscriber"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Applies an accumulator function over the source Observable where the
     * accumulator function itself returns an Observable, then each intermediate
     * Observable returned is merged into the output Observable.
     *
     * <span class="informal">It's like {@link scan}, but the Observables returned
     * by the accumulator are merged into the outer Observable.</span>
     *
     * @example <caption>Count the number of click events</caption>
     * const click$ = Rx.Observable.fromEvent(document, 'click');
     * const one$ = click$.mapTo(1);
     * const seed = 0;
     * const count$ = one$.mergeScan((acc, one) => Rx.Observable.of(acc + one), seed);
     * count$.subscribe(x => console.log(x));
     *
     * // Results:
     * 1
     * 2
     * 3
     * 4
     * // ...and so on for each click
     *
     * @param {function(acc: R, value: T): Observable<R>} accumulator
     * The accumulator function called on each source value.
     * @param seed The initial accumulation value.
     * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of
     * input Observables being subscribed to concurrently.
     * @return {Observable<R>} An observable of the accumulated values.
     * @method mergeScan
     * @owner Observable
     */
    function mergeScan(accumulator, seed, concurrent = Number.POSITIVE_INFINITY) {
        return this.lift(new MergeScanOperator(accumulator, seed, concurrent));
    }
    exports_1("mergeScan", mergeScan);
    var tryCatch_1, errorObject_1, subscribeToResult_1, OuterSubscriber_1, MergeScanOperator, MergeScanSubscriber;
    return {
        setters: [
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            }
        ],
        execute: function () {
            MergeScanOperator = class MergeScanOperator {
                constructor(accumulator, seed, concurrent) {
                    this.accumulator = accumulator;
                    this.seed = seed;
                    this.concurrent = concurrent;
                }
                call(subscriber, source) {
                    return source.subscribe(new MergeScanSubscriber(subscriber, this.accumulator, this.seed, this.concurrent));
                }
            };
            exports_1("MergeScanOperator", MergeScanOperator);
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            MergeScanSubscriber = class MergeScanSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, accumulator, acc, concurrent) {
                    super(destination);
                    this.accumulator = accumulator;
                    this.acc = acc;
                    this.concurrent = concurrent;
                    this.hasValue = false;
                    this.hasCompleted = false;
                    this.buffer = [];
                    this.active = 0;
                    this.index = 0;
                }
                _next(value) {
                    if (this.active < this.concurrent) {
                        const index = this.index++;
                        const ish = tryCatch_1.tryCatch(this.accumulator)(this.acc, value);
                        const destination = this.destination;
                        if (ish === errorObject_1.errorObject) {
                            destination.error(errorObject_1.errorObject.e);
                        }
                        else {
                            this.active++;
                            this._innerSub(ish, value, index);
                        }
                    }
                    else {
                        this.buffer.push(value);
                    }
                }
                _innerSub(ish, value, index) {
                    this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
                }
                _complete() {
                    this.hasCompleted = true;
                    if (this.active === 0 && this.buffer.length === 0) {
                        if (this.hasValue === false) {
                            this.destination.next(this.acc);
                        }
                        this.destination.complete();
                    }
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    const { destination } = this;
                    this.acc = innerValue;
                    this.hasValue = true;
                    destination.next(innerValue);
                }
                notifyComplete(innerSub) {
                    const buffer = this.buffer;
                    this.remove(innerSub);
                    this.active--;
                    if (buffer.length > 0) {
                        this._next(buffer.shift());
                    }
                    else if (this.active === 0 && this.hasCompleted) {
                        if (this.hasValue === false) {
                            this.destination.next(this.acc);
                        }
                        this.destination.complete();
                    }
                }
            };
            exports_1("MergeScanSubscriber", MergeScanSubscriber);
        }
    };
});
//# sourceMappingURL=mergeScan.js.map