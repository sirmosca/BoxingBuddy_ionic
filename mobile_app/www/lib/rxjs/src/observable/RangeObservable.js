System.register(["../Observable"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, RangeObservable;
    return {
        setters: [
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }
        ],
        execute: function () {
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @extends {Ignored}
             * @hide true
             */
            RangeObservable = class RangeObservable extends Observable_1.Observable {
                /**
                 * Creates an Observable that emits a sequence of numbers within a specified
                 * range.
                 *
                 * <span class="informal">Emits a sequence of numbers in a range.</span>
                 *
                 * <img src="./img/range.png" width="100%">
                 *
                 * `range` operator emits a range of sequential integers, in order, where you
                 * select the `start` of the range and its `length`. By default, uses no
                 * IScheduler and just delivers the notifications synchronously, but may use
                 * an optional IScheduler to regulate those deliveries.
                 *
                 * @example <caption>Emits the numbers 1 to 10</caption>
                 * var numbers = Rx.Observable.range(1, 10);
                 * numbers.subscribe(x => console.log(x));
                 *
                 * @see {@link timer}
                 * @see {@link interval}
                 *
                 * @param {number} [start=0] The value of the first integer in the sequence.
                 * @param {number} [count=0] The number of sequential integers to generate.
                 * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
                 * the emissions of the notifications.
                 * @return {Observable} An Observable of numbers that emits a finite range of
                 * sequential integers.
                 * @static true
                 * @name range
                 * @owner Observable
                 */
                static create(start = 0, count = 0, scheduler) {
                    return new RangeObservable(start, count, scheduler);
                }
                static dispatch(state) {
                    const { start, index, count, subscriber } = state;
                    if (index >= count) {
                        subscriber.complete();
                        return;
                    }
                    subscriber.next(start);
                    if (subscriber.closed) {
                        return;
                    }
                    state.index = index + 1;
                    state.start = start + 1;
                    this.schedule(state);
                }
                constructor(start, count, scheduler) {
                    super();
                    this.start = start;
                    this._count = count;
                    this.scheduler = scheduler;
                }
                _subscribe(subscriber) {
                    let index = 0;
                    let start = this.start;
                    const count = this._count;
                    const scheduler = this.scheduler;
                    if (scheduler) {
                        return scheduler.schedule(RangeObservable.dispatch, 0, {
                            index, count, start, subscriber
                        });
                    }
                    else {
                        do {
                            if (index++ >= count) {
                                subscriber.complete();
                                break;
                            }
                            subscriber.next(start++);
                            if (subscriber.closed) {
                                break;
                            }
                        } while (true);
                    }
                }
            };
            exports_1("RangeObservable", RangeObservable);
        }
    };
});
//# sourceMappingURL=RangeObservable.js.map