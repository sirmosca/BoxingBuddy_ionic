System.register(["../Observable", "./ScalarObservable", "./EmptyObservable", "../util/isScheduler"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, ScalarObservable_1, EmptyObservable_1, isScheduler_1, ArrayObservable;
    return {
        setters: [
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (ScalarObservable_1_1) {
                ScalarObservable_1 = ScalarObservable_1_1;
            },
            function (EmptyObservable_1_1) {
                EmptyObservable_1 = EmptyObservable_1_1;
            },
            function (isScheduler_1_1) {
                isScheduler_1 = isScheduler_1_1;
            }
        ],
        execute: function () {
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @extends {Ignored}
             * @hide true
             */
            ArrayObservable = class ArrayObservable extends Observable_1.Observable {
                constructor(array, scheduler) {
                    super();
                    this.array = array;
                    this.scheduler = scheduler;
                    if (!scheduler && array.length === 1) {
                        this._isScalar = true;
                        this.value = array[0];
                    }
                }
                static create(array, scheduler) {
                    return new ArrayObservable(array, scheduler);
                }
                /**
                 * Creates an Observable that emits some values you specify as arguments,
                 * immediately one after the other, and then emits a complete notification.
                 *
                 * <span class="informal">Emits the arguments you provide, then completes.
                 * </span>
                 *
                 * <img src="./img/of.png" width="100%">
                 *
                 * This static operator is useful for creating a simple Observable that only
                 * emits the arguments given, and the complete notification thereafter. It can
                 * be used for composing with other Observables, such as with {@link concat}.
                 * By default, it uses a `null` IScheduler, which means the `next`
                 * notifications are sent synchronously, although with a different IScheduler
                 * it is possible to determine when those notifications will be delivered.
                 *
                 * @example <caption>Emit 10, 20, 30, then 'a', 'b', 'c', then start ticking every second.</caption>
                 * var numbers = Rx.Observable.of(10, 20, 30);
                 * var letters = Rx.Observable.of('a', 'b', 'c');
                 * var interval = Rx.Observable.interval(1000);
                 * var result = numbers.concat(letters).concat(interval);
                 * result.subscribe(x => console.log(x));
                 *
                 * @see {@link create}
                 * @see {@link empty}
                 * @see {@link never}
                 * @see {@link throw}
                 *
                 * @param {...T} values Arguments that represent `next` values to be emitted.
                 * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
                 * the emissions of the `next` notifications.
                 * @return {Observable<T>} An Observable that emits each given input value.
                 * @static true
                 * @name of
                 * @owner Observable
                 */
                static of(...array) {
                    let scheduler = array[array.length - 1];
                    if (isScheduler_1.isScheduler(scheduler)) {
                        array.pop();
                    }
                    else {
                        scheduler = null;
                    }
                    const len = array.length;
                    if (len > 1) {
                        return new ArrayObservable(array, scheduler);
                    }
                    else if (len === 1) {
                        return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
                    }
                    else {
                        return new EmptyObservable_1.EmptyObservable(scheduler);
                    }
                }
                static dispatch(state) {
                    const { array, index, count, subscriber } = state;
                    if (index >= count) {
                        subscriber.complete();
                        return;
                    }
                    subscriber.next(array[index]);
                    if (subscriber.closed) {
                        return;
                    }
                    state.index = index + 1;
                    this.schedule(state);
                }
                _subscribe(subscriber) {
                    let index = 0;
                    const array = this.array;
                    const count = array.length;
                    const scheduler = this.scheduler;
                    if (scheduler) {
                        return scheduler.schedule(ArrayObservable.dispatch, 0, {
                            array, index, count, subscriber
                        });
                    }
                    else {
                        for (let i = 0; i < count && !subscriber.closed; i++) {
                            subscriber.next(array[i]);
                        }
                        subscriber.complete();
                    }
                }
            };
            exports_1("ArrayObservable", ArrayObservable);
        }
    };
});
//# sourceMappingURL=ArrayObservable.js.map