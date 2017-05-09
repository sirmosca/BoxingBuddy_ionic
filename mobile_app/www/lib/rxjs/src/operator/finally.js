System.register(["../Subscriber", "../Subscription"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Returns an Observable that mirrors the source Observable, but will call a specified function when
     * the source terminates on complete or error.
     * @param {function} callback Function to be called when source terminates.
     * @return {Observable} An Observable that mirrors the source, but will call the specified function on termination.
     * @method finally
     * @owner Observable
     */
    function _finally(callback) {
        return this.lift(new FinallyOperator(callback));
    }
    exports_1("_finally", _finally);
    var Subscriber_1, Subscription_1, FinallyOperator, FinallySubscriber;
    return {
        setters: [
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            }
        ],
        execute: function () {
            FinallyOperator = class FinallyOperator {
                constructor(callback) {
                    this.callback = callback;
                }
                call(subscriber, source) {
                    return source.subscribe(new FinallySubscriber(subscriber, this.callback));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            FinallySubscriber = class FinallySubscriber extends Subscriber_1.Subscriber {
                constructor(destination, callback) {
                    super(destination);
                    this.add(new Subscription_1.Subscription(callback));
                }
            };
        }
    };
});
//# sourceMappingURL=finally.js.map