System.register(["../Subscriber"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Returns an Observable that mirrors the source Observable with the exception of an `error`. If the source Observable
     * calls `error`, this method will resubscribe to the source Observable for a maximum of `count` resubscriptions (given
     * as a number parameter) rather than propagating the `error` call.
     *
     * <img src="./img/retry.png" width="100%">
     *
     * Any and all items emitted by the source Observable will be emitted by the resulting Observable, even those emitted
     * during failed subscriptions. For example, if an Observable fails at first but emits [1, 2] then succeeds the second
     * time and emits: [1, 2, 3, 4, 5] then the complete stream of emissions and notifications
     * would be: [1, 2, 1, 2, 3, 4, 5, `complete`].
     * @param {number} count - Number of retry attempts before failing.
     * @return {Observable} The source Observable modified with the retry logic.
     * @method retry
     * @owner Observable
     */
    function retry(count = -1) {
        return this.lift(new RetryOperator(count, this));
    }
    exports_1("retry", retry);
    var Subscriber_1, RetryOperator, RetrySubscriber;
    return {
        setters: [
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }
        ],
        execute: function () {
            RetryOperator = class RetryOperator {
                constructor(count, source) {
                    this.count = count;
                    this.source = source;
                }
                call(subscriber, source) {
                    return source.subscribe(new RetrySubscriber(subscriber, this.count, this.source));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            RetrySubscriber = class RetrySubscriber extends Subscriber_1.Subscriber {
                constructor(destination, count, source) {
                    super(destination);
                    this.count = count;
                    this.source = source;
                }
                error(err) {
                    if (!this.isStopped) {
                        const { source, count } = this;
                        if (count === 0) {
                            return super.error(err);
                        }
                        else if (count > -1) {
                            this.count = count - 1;
                        }
                        source.subscribe(this._unsubscribeAndRecycle());
                    }
                }
            };
        }
    };
});
//# sourceMappingURL=retry.js.map