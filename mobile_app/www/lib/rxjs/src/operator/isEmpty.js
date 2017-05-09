System.register(["../Subscriber"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * If the source Observable is empty it returns an Observable that emits true, otherwise it emits false.
     *
     * <img src="./img/isEmpty.png" width="100%">
     *
     * @return {Observable} An Observable that emits a Boolean.
     * @method isEmpty
     * @owner Observable
     */
    function isEmpty() {
        return this.lift(new IsEmptyOperator());
    }
    exports_1("isEmpty", isEmpty);
    var Subscriber_1, IsEmptyOperator, IsEmptySubscriber;
    return {
        setters: [
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }
        ],
        execute: function () {
            IsEmptyOperator = class IsEmptyOperator {
                call(observer, source) {
                    return source.subscribe(new IsEmptySubscriber(observer));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            IsEmptySubscriber = class IsEmptySubscriber extends Subscriber_1.Subscriber {
                constructor(destination) {
                    super(destination);
                }
                notifyComplete(isEmpty) {
                    const destination = this.destination;
                    destination.next(isEmpty);
                    destination.complete();
                }
                _next(value) {
                    this.notifyComplete(false);
                }
                _complete() {
                    this.notifyComplete(true);
                }
            };
        }
    };
});
//# sourceMappingURL=isEmpty.js.map