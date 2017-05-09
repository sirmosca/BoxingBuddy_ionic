System.register(["../Subscriber"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Returns an Observable that skips all items emitted by the source Observable as long as a specified condition holds
     * true, but emits all further source items as soon as the condition becomes false.
     *
     * <img src="./img/skipWhile.png" width="100%">
     *
     * @param {Function} predicate - A function to test each item emitted from the source Observable.
     * @return {Observable<T>} An Observable that begins emitting items emitted by the source Observable when the
     * specified predicate becomes false.
     * @method skipWhile
     * @owner Observable
     */
    function skipWhile(predicate) {
        return this.lift(new SkipWhileOperator(predicate));
    }
    exports_1("skipWhile", skipWhile);
    var Subscriber_1, SkipWhileOperator, SkipWhileSubscriber;
    return {
        setters: [
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }
        ],
        execute: function () {
            SkipWhileOperator = class SkipWhileOperator {
                constructor(predicate) {
                    this.predicate = predicate;
                }
                call(subscriber, source) {
                    return source.subscribe(new SkipWhileSubscriber(subscriber, this.predicate));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            SkipWhileSubscriber = class SkipWhileSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, predicate) {
                    super(destination);
                    this.predicate = predicate;
                    this.skipping = true;
                    this.index = 0;
                }
                _next(value) {
                    const destination = this.destination;
                    if (this.skipping) {
                        this.tryCallPredicate(value);
                    }
                    if (!this.skipping) {
                        destination.next(value);
                    }
                }
                tryCallPredicate(value) {
                    try {
                        const result = this.predicate(value, this.index++);
                        this.skipping = Boolean(result);
                    }
                    catch (err) {
                        this.destination.error(err);
                    }
                }
            };
        }
    };
});
//# sourceMappingURL=skipWhile.js.map