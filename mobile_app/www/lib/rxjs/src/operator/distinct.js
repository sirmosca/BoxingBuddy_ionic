System.register(["../OuterSubscriber", "../util/subscribeToResult", "../util/Set"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from previous items.
     *
     * If a keySelector function is provided, then it will project each value from the source observable into a new value that it will
     * check for equality with previously projected values. If a keySelector function is not provided, it will use each value from the
     * source observable directly with an equality check against previous values.
     *
     * In JavaScript runtimes that support `Set`, this operator will use a `Set` to improve performance of the distinct value checking.
     *
     * In other runtimes, this operator will use a minimal implementation of `Set` that relies on an `Array` and `indexOf` under the
     * hood, so performance will degrade as more values are checked for distinction. Even in newer browsers, a long-running `distinct`
     * use might result in memory leaks. To help alleviate this in some scenarios, an optional `flushes` parameter is also provided so
     * that the internal `Set` can be "flushed", basically clearing it of values.
     *
     * @example <caption>A simple example with numbers</caption>
     * Observable.of(1, 1, 2, 2, 2, 1, 2, 3, 4, 3, 2, 1)
     *   .distinct()
     *   .subscribe(x => console.log(x)); // 1, 2, 3, 4
     *
     * @example <caption>An example using a keySelector function</caption>
     * interface Person {
     *    age: number,
     *    name: string
     * }
     *
     * Observable.of<Person>(
     *     { age: 4, name: 'Foo'},
     *     { age: 7, name: 'Bar'},
     *     { age: 5, name: 'Foo'})
     *     .distinct((p: Person) => p.name)
     *     .subscribe(x => console.log(x));
     *
     * // displays:
     * // { age: 4, name: 'Foo' }
     * // { age: 7, name: 'Bar' }
     *
     * @see {@link distinctUntilChanged}
     * @see {@link distinctUntilKeyChanged}
     *
     * @param {function} [keySelector] Optional function to select which value you want to check as distinct.
     * @param {Observable} [flushes] Optional Observable for flushing the internal HashSet of the operator.
     * @return {Observable} An Observable that emits items from the source Observable with distinct values.
     * @method distinct
     * @owner Observable
     */
    function distinct(keySelector, flushes) {
        return this.lift(new DistinctOperator(keySelector, flushes));
    }
    exports_1("distinct", distinct);
    var OuterSubscriber_1, subscribeToResult_1, Set_1, DistinctOperator, DistinctSubscriber;
    return {
        setters: [
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            },
            function (Set_1_1) {
                Set_1 = Set_1_1;
            }
        ],
        execute: function () {
            DistinctOperator = class DistinctOperator {
                constructor(keySelector, flushes) {
                    this.keySelector = keySelector;
                    this.flushes = flushes;
                }
                call(subscriber, source) {
                    return source.subscribe(new DistinctSubscriber(subscriber, this.keySelector, this.flushes));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            DistinctSubscriber = class DistinctSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, keySelector, flushes) {
                    super(destination);
                    this.keySelector = keySelector;
                    this.values = new Set_1.Set();
                    if (flushes) {
                        this.add(subscribeToResult_1.subscribeToResult(this, flushes));
                    }
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.values.clear();
                }
                notifyError(error, innerSub) {
                    this._error(error);
                }
                _next(value) {
                    if (this.keySelector) {
                        this._useKeySelector(value);
                    }
                    else {
                        this._finalizeNext(value, value);
                    }
                }
                _useKeySelector(value) {
                    let key;
                    const { destination } = this;
                    try {
                        key = this.keySelector(value);
                    }
                    catch (err) {
                        destination.error(err);
                        return;
                    }
                    this._finalizeNext(key, value);
                }
                _finalizeNext(key, value) {
                    const { values } = this;
                    if (!values.has(key)) {
                        values.add(key);
                        this.destination.next(value);
                    }
                }
            };
            exports_1("DistinctSubscriber", DistinctSubscriber);
        }
    };
});
//# sourceMappingURL=distinct.js.map