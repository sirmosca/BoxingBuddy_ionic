System.register(["./reduce"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * The Max operator operates on an Observable that emits numbers (or items that can be compared with a provided function),
     * and when source Observable completes it emits a single item: the item with the largest value.
     *
     * <img src="./img/max.png" width="100%">
     *
     * @example <caption>Get the maximal value of a series of numbers</caption>
     * Rx.Observable.of(5, 4, 7, 2, 8)
     *   .max()
     *   .subscribe(x => console.log(x)); // -> 8
     *
     * @example <caption>Use a comparer function to get the maximal item</caption>
     * interface Person {
     *   age: number,
     *   name: string
     * }
     * Observable.of<Person>({age: 7, name: 'Foo'},
     *                       {age: 5, name: 'Bar'},
     *                       {age: 9, name: 'Beer'})
     *           .max<Person>((a: Person, b: Person) => a.age < b.age ? -1 : 1)
     *           .subscribe((x: Person) => console.log(x.name)); // -> 'Beer'
     * }
     *
     * @see {@link min}
     *
     * @param {Function} [comparer] - Optional comparer function that it will use instead of its default to compare the
     * value of two items.
     * @return {Observable} An Observable that emits item with the largest value.
     * @method max
     * @owner Observable
     */
    function max(comparer) {
        const max = (typeof comparer === 'function')
            ? (x, y) => comparer(x, y) > 0 ? x : y
            : (x, y) => x > y ? x : y;
        return this.lift(new reduce_1.ReduceOperator(max));
    }
    exports_1("max", max);
    var reduce_1;
    return {
        setters: [
            function (reduce_1_1) {
                reduce_1 = reduce_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=max.js.map