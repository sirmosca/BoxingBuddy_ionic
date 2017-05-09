System.register(["../Subscriber"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * @return {Observable<any[]>|WebSocketSubject<T>|Observable<T>}
     * @method toArray
     * @owner Observable
     */
    function toArray() {
        return this.lift(new ToArrayOperator());
    }
    exports_1("toArray", toArray);
    var Subscriber_1, ToArrayOperator, ToArraySubscriber;
    return {
        setters: [
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }
        ],
        execute: function () {
            ToArrayOperator = class ToArrayOperator {
                call(subscriber, source) {
                    return source.subscribe(new ToArraySubscriber(subscriber));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            ToArraySubscriber = class ToArraySubscriber extends Subscriber_1.Subscriber {
                constructor(destination) {
                    super(destination);
                    this.array = [];
                }
                _next(x) {
                    this.array.push(x);
                }
                _complete() {
                    this.destination.next(this.array);
                    this.destination.complete();
                }
            };
        }
    };
});
//# sourceMappingURL=toArray.js.map