System.register(["../OuterSubscriber", "../util/subscribeToResult"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Returns an Observable that skips items emitted by the source Observable until a second Observable emits an item.
     *
     * <img src="./img/skipUntil.png" width="100%">
     *
     * @param {Observable} notifier - The second Observable that has to emit an item before the source Observable's elements begin to
     * be mirrored by the resulting Observable.
     * @return {Observable<T>} An Observable that skips items from the source Observable until the second Observable emits
     * an item, then emits the remaining items.
     * @method skipUntil
     * @owner Observable
     */
    function skipUntil(notifier) {
        return this.lift(new SkipUntilOperator(notifier));
    }
    exports_1("skipUntil", skipUntil);
    var OuterSubscriber_1, subscribeToResult_1, SkipUntilOperator, SkipUntilSubscriber;
    return {
        setters: [
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }
        ],
        execute: function () {
            SkipUntilOperator = class SkipUntilOperator {
                constructor(notifier) {
                    this.notifier = notifier;
                }
                call(subscriber, source) {
                    return source.subscribe(new SkipUntilSubscriber(subscriber, this.notifier));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            SkipUntilSubscriber = class SkipUntilSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, notifier) {
                    super(destination);
                    this.hasValue = false;
                    this.isInnerStopped = false;
                    this.add(subscribeToResult_1.subscribeToResult(this, notifier));
                }
                _next(value) {
                    if (this.hasValue) {
                        super._next(value);
                    }
                }
                _complete() {
                    if (this.isInnerStopped) {
                        super._complete();
                    }
                    else {
                        this.unsubscribe();
                    }
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.hasValue = true;
                }
                notifyComplete() {
                    this.isInnerStopped = true;
                    if (this.isStopped) {
                        super._complete();
                    }
                }
            };
        }
    };
});
//# sourceMappingURL=skipUntil.js.map