System.register(["../Subscriber"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Emits the given constant value on the output Observable every time the source
     * Observable emits a value.
     *
     * <span class="informal">Like {@link map}, but it maps every source value to
     * the same output value every time.</span>
     *
     * <img src="./img/mapTo.png" width="100%">
     *
     * Takes a constant `value` as argument, and emits that whenever the source
     * Observable emits a value. In other words, ignores the actual source value,
     * and simply uses the emission moment to know when to emit the given `value`.
     *
     * @example <caption>Map every every click to the string 'Hi'</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var greetings = clicks.mapTo('Hi');
     * greetings.subscribe(x => console.log(x));
     *
     * @see {@link map}
     *
     * @param {any} value The value to map each source value to.
     * @return {Observable} An Observable that emits the given `value` every time
     * the source Observable emits something.
     * @method mapTo
     * @owner Observable
     */
    function mapTo(value) {
        return this.lift(new MapToOperator(value));
    }
    exports_1("mapTo", mapTo);
    var Subscriber_1, MapToOperator, MapToSubscriber;
    return {
        setters: [
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }
        ],
        execute: function () {
            MapToOperator = class MapToOperator {
                constructor(value) {
                    this.value = value;
                }
                call(subscriber, source) {
                    return source.subscribe(new MapToSubscriber(subscriber, this.value));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            MapToSubscriber = class MapToSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, value) {
                    super(destination);
                    this.value = value;
                }
                _next(x) {
                    this.destination.next(this.value);
                }
            };
        }
    };
});
//# sourceMappingURL=mapTo.js.map