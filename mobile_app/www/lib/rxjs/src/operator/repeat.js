System.register(["../Subscriber", "../observable/EmptyObservable"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Returns an Observable that repeats the stream of items emitted by the source Observable at most count times.
     *
     * <img src="./img/repeat.png" width="100%">
     *
     * @param {number} [count] The number of times the source Observable items are repeated, a count of 0 will yield
     * an empty Observable.
     * @return {Observable} An Observable that repeats the stream of items emitted by the source Observable at most
     * count times.
     * @method repeat
     * @owner Observable
     */
    function repeat(count = -1) {
        if (count === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        else if (count < 0) {
            return this.lift(new RepeatOperator(-1, this));
        }
        else {
            return this.lift(new RepeatOperator(count - 1, this));
        }
    }
    exports_1("repeat", repeat);
    var Subscriber_1, EmptyObservable_1, RepeatOperator, RepeatSubscriber;
    return {
        setters: [
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (EmptyObservable_1_1) {
                EmptyObservable_1 = EmptyObservable_1_1;
            }
        ],
        execute: function () {
            RepeatOperator = class RepeatOperator {
                constructor(count, source) {
                    this.count = count;
                    this.source = source;
                }
                call(subscriber, source) {
                    return source.subscribe(new RepeatSubscriber(subscriber, this.count, this.source));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            RepeatSubscriber = class RepeatSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, count, source) {
                    super(destination);
                    this.count = count;
                    this.source = source;
                }
                complete() {
                    if (!this.isStopped) {
                        const { source, count } = this;
                        if (count === 0) {
                            return super.complete();
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
//# sourceMappingURL=repeat.js.map