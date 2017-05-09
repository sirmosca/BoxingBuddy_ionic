System.register(["../Subscriber", "../util/ArgumentOutOfRangeError"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Emits the single value at the specified `index` in a sequence of emissions
     * from the source Observable.
     *
     * <span class="informal">Emits only the i-th value, then completes.</span>
     *
     * <img src="./img/elementAt.png" width="100%">
     *
     * `elementAt` returns an Observable that emits the item at the specified
     * `index` in the source Observable, or a default value if that `index` is out
     * of range and the `default` argument is provided. If the `default` argument is
     * not given and the `index` is out of range, the output Observable will emit an
     * `ArgumentOutOfRangeError` error.
     *
     * @example <caption>Emit only the third click event</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var result = clicks.elementAt(2);
     * result.subscribe(x => console.log(x));
     *
     * // Results in:
     * // click 1 = nothing
     * // click 2 = nothing
     * // click 3 = MouseEvent object logged to console
     *
     * @see {@link first}
     * @see {@link last}
     * @see {@link skip}
     * @see {@link single}
     * @see {@link take}
     *
     * @throws {ArgumentOutOfRangeError} When using `elementAt(i)`, it delivers an
     * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0` or the
     * Observable has completed before emitting the i-th `next` notification.
     *
     * @param {number} index Is the number `i` for the i-th source emission that has
     * happened since the subscription, starting from the number `0`.
     * @param {T} [defaultValue] The default value returned for missing indices.
     * @return {Observable} An Observable that emits a single item, if it is found.
     * Otherwise, will emit the default value if given. If not, then emits an error.
     * @method elementAt
     * @owner Observable
     */
    function elementAt(index, defaultValue) {
        return this.lift(new ElementAtOperator(index, defaultValue));
    }
    exports_1("elementAt", elementAt);
    var Subscriber_1, ArgumentOutOfRangeError_1, ElementAtOperator, ElementAtSubscriber;
    return {
        setters: [
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (ArgumentOutOfRangeError_1_1) {
                ArgumentOutOfRangeError_1 = ArgumentOutOfRangeError_1_1;
            }
        ],
        execute: function () {
            ElementAtOperator = class ElementAtOperator {
                constructor(index, defaultValue) {
                    this.index = index;
                    this.defaultValue = defaultValue;
                    if (index < 0) {
                        throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
                    }
                }
                call(subscriber, source) {
                    return source.subscribe(new ElementAtSubscriber(subscriber, this.index, this.defaultValue));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            ElementAtSubscriber = class ElementAtSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, index, defaultValue) {
                    super(destination);
                    this.index = index;
                    this.defaultValue = defaultValue;
                }
                _next(x) {
                    if (this.index-- === 0) {
                        this.destination.next(x);
                        this.destination.complete();
                    }
                }
                _complete() {
                    const destination = this.destination;
                    if (this.index >= 0) {
                        if (typeof this.defaultValue !== 'undefined') {
                            destination.next(this.defaultValue);
                        }
                        else {
                            destination.error(new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError);
                        }
                    }
                    destination.complete();
                }
            };
        }
    };
});
//# sourceMappingURL=elementAt.js.map