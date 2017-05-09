System.register(["../Subscriber"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Returns an Observable that skips the first `count` items emitted by the source Observable.
     *
     * <img src="./img/skip.png" width="100%">
     *
     * @param {Number} count - The number of times, items emitted by source Observable should be skipped.
     * @return {Observable} An Observable that skips values emitted by the source Observable.
     *
     * @method skip
     * @owner Observable
     */
    function skip(count) {
        return this.lift(new SkipOperator(count));
    }
    exports_1("skip", skip);
    var Subscriber_1, SkipOperator, SkipSubscriber;
    return {
        setters: [
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }
        ],
        execute: function () {
            SkipOperator = class SkipOperator {
                constructor(total) {
                    this.total = total;
                }
                call(subscriber, source) {
                    return source.subscribe(new SkipSubscriber(subscriber, this.total));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            SkipSubscriber = class SkipSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, total) {
                    super(destination);
                    this.total = total;
                    this.count = 0;
                }
                _next(x) {
                    if (++this.count > this.total) {
                        this.destination.next(x);
                    }
                }
            };
        }
    };
});
//# sourceMappingURL=skip.js.map