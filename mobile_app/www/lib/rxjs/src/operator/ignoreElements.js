System.register(["../Subscriber", "../util/noop"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Ignores all items emitted by the source Observable and only passes calls of `complete` or `error`.
     *
     * <img src="./img/ignoreElements.png" width="100%">
     *
     * @return {Observable} An empty Observable that only calls `complete`
     * or `error`, based on which one is called by the source Observable.
     * @method ignoreElements
     * @owner Observable
     */
    function ignoreElements() {
        return this.lift(new IgnoreElementsOperator());
    }
    exports_1("ignoreElements", ignoreElements);
    var Subscriber_1, noop_1, IgnoreElementsOperator, IgnoreElementsSubscriber;
    return {
        setters: [
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (noop_1_1) {
                noop_1 = noop_1_1;
            }
        ],
        execute: function () {
            ;
            IgnoreElementsOperator = class IgnoreElementsOperator {
                call(subscriber, source) {
                    return source.subscribe(new IgnoreElementsSubscriber(subscriber));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            IgnoreElementsSubscriber = class IgnoreElementsSubscriber extends Subscriber_1.Subscriber {
                _next(unused) {
                    noop_1.noop();
                }
            };
        }
    };
});
//# sourceMappingURL=ignoreElements.js.map