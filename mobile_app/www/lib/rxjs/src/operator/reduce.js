System.register(["../Subscriber"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /* tslint:enable:max-line-length */
    /**
     * Applies an accumulator function over the source Observable, and returns the
     * accumulated result when the source completes, given an optional seed value.
     *
     * <span class="informal">Combines together all values emitted on the source,
     * using an accumulator function that knows how to join a new source value into
     * the accumulation from the past.</span>
     *
     * <img src="./img/reduce.png" width="100%">
     *
     * Like
     * [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce),
     * `reduce` applies an `accumulator` function against an accumulation and each
     * value of the source Observable (from the past) to reduce it to a single
     * value, emitted on the output Observable. Note that `reduce` will only emit
     * one value, only when the source Observable completes. It is equivalent to
     * applying operator {@link scan} followed by operator {@link last}.
     *
     * Returns an Observable that applies a specified `accumulator` function to each
     * item emitted by the source Observable. If a `seed` value is specified, then
     * that value will be used as the initial value for the accumulator. If no seed
     * value is specified, the first item of the source is used as the seed.
     *
     * @example <caption>Count the number of click events that happened in 5 seconds</caption>
     * var clicksInFiveSeconds = Rx.Observable.fromEvent(document, 'click')
     *   .takeUntil(Rx.Observable.interval(5000));
     * var ones = clicksInFiveSeconds.mapTo(1);
     * var seed = 0;
     * var count = ones.reduce((acc, one) => acc + one, seed);
     * count.subscribe(x => console.log(x));
     *
     * @see {@link count}
     * @see {@link expand}
     * @see {@link mergeScan}
     * @see {@link scan}
     *
     * @param {function(acc: R, value: T, index: number): R} accumulator The accumulator function
     * called on each source value.
     * @param {R} [seed] The initial accumulation value.
     * @return {Observable<R>} An Observable that emits a single value that is the
     * result of accumulating the values emitted by the source Observable.
     * @method reduce
     * @owner Observable
     */
    function reduce(accumulator, seed) {
        let hasSeed = false;
        // providing a seed of `undefined` *should* be valid and trigger
        // hasSeed! so don't use `seed !== undefined` checks!
        // For this reason, we have to check it here at the original call site
        // otherwise inside Operator/Subscriber we won't know if `undefined`
        // means they didn't provide anything or if they literally provided `undefined`
        if (arguments.length >= 2) {
            hasSeed = true;
        }
        return this.lift(new ReduceOperator(accumulator, seed, hasSeed));
    }
    exports_1("reduce", reduce);
    var Subscriber_1, ReduceOperator, ReduceSubscriber;
    return {
        setters: [
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }
        ],
        execute: function () {
            ReduceOperator = class ReduceOperator {
                constructor(accumulator, seed, hasSeed = false) {
                    this.accumulator = accumulator;
                    this.seed = seed;
                    this.hasSeed = hasSeed;
                }
                call(subscriber, source) {
                    return source.subscribe(new ReduceSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
                }
            };
            exports_1("ReduceOperator", ReduceOperator);
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            ReduceSubscriber = class ReduceSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, accumulator, seed, hasSeed) {
                    super(destination);
                    this.accumulator = accumulator;
                    this.hasSeed = hasSeed;
                    this.index = 0;
                    this.hasValue = false;
                    this.acc = seed;
                    if (!this.hasSeed) {
                        this.index++;
                    }
                }
                _next(value) {
                    if (this.hasValue || (this.hasValue = this.hasSeed)) {
                        this._tryReduce(value);
                    }
                    else {
                        this.acc = value;
                        this.hasValue = true;
                    }
                }
                _tryReduce(value) {
                    let result;
                    try {
                        result = this.accumulator(this.acc, value, this.index++);
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    this.acc = result;
                }
                _complete() {
                    if (this.hasValue || this.hasSeed) {
                        this.destination.next(this.acc);
                    }
                    this.destination.complete();
                }
            };
            exports_1("ReduceSubscriber", ReduceSubscriber);
        }
    };
});
//# sourceMappingURL=reduce.js.map