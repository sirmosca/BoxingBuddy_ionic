System.register(["../Subscriber"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /* tslint:enable:max-line-length */
    /**
     * Emits only the first value emitted by the source Observable that meets some
     * condition.
     *
     * <span class="informal">Finds the first value that passes some test and emits
     * that.</span>
     *
     * <img src="./img/find.png" width="100%">
     *
     * `find` searches for the first item in the source Observable that matches the
     * specified condition embodied by the `predicate`, and returns the first
     * occurrence in the source. Unlike {@link first}, the `predicate` is required
     * in `find`, and does not emit an error if a valid value is not found.
     *
     * @example <caption>Find and emit the first click that happens on a DIV element</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var result = clicks.find(ev => ev.target.tagName === 'DIV');
     * result.subscribe(x => console.log(x));
     *
     * @see {@link filter}
     * @see {@link first}
     * @see {@link findIndex}
     * @see {@link take}
     *
     * @param {function(value: T, index: number, source: Observable<T>): boolean} predicate
     * A function called with each item to test for condition matching.
     * @param {any} [thisArg] An optional argument to determine the value of `this`
     * in the `predicate` function.
     * @return {Observable<T>} An Observable of the first item that matches the
     * condition.
     * @method find
     * @owner Observable
     */
    function find(predicate, thisArg) {
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate is not a function');
        }
        return this.lift(new FindValueOperator(predicate, this, false, thisArg));
    }
    exports_1("find", find);
    var Subscriber_1, FindValueOperator, FindValueSubscriber;
    return {
        setters: [
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }
        ],
        execute: function () {
            FindValueOperator = class FindValueOperator {
                constructor(predicate, source, yieldIndex, thisArg) {
                    this.predicate = predicate;
                    this.source = source;
                    this.yieldIndex = yieldIndex;
                    this.thisArg = thisArg;
                }
                call(observer, source) {
                    return source.subscribe(new FindValueSubscriber(observer, this.predicate, this.source, this.yieldIndex, this.thisArg));
                }
            };
            exports_1("FindValueOperator", FindValueOperator);
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            FindValueSubscriber = class FindValueSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, predicate, source, yieldIndex, thisArg) {
                    super(destination);
                    this.predicate = predicate;
                    this.source = source;
                    this.yieldIndex = yieldIndex;
                    this.thisArg = thisArg;
                    this.index = 0;
                }
                notifyComplete(value) {
                    const destination = this.destination;
                    destination.next(value);
                    destination.complete();
                }
                _next(value) {
                    const { predicate, thisArg } = this;
                    const index = this.index++;
                    try {
                        const result = predicate.call(thisArg || this, value, index, this.source);
                        if (result) {
                            this.notifyComplete(this.yieldIndex ? index : value);
                        }
                    }
                    catch (err) {
                        this.destination.error(err);
                    }
                }
                _complete() {
                    this.notifyComplete(this.yieldIndex ? -1 : undefined);
                }
            };
            exports_1("FindValueSubscriber", FindValueSubscriber);
        }
    };
});
//# sourceMappingURL=find.js.map