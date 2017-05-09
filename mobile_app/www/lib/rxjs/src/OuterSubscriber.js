System.register(["./Subscriber"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1, OuterSubscriber;
    return {
        setters: [
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }
        ],
        execute: function () {
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            OuterSubscriber = class OuterSubscriber extends Subscriber_1.Subscriber {
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.destination.next(innerValue);
                }
                notifyError(error, innerSub) {
                    this.destination.error(error);
                }
                notifyComplete(innerSub) {
                    this.destination.complete();
                }
            };
            exports_1("OuterSubscriber", OuterSubscriber);
        }
    };
});
//# sourceMappingURL=OuterSubscriber.js.map