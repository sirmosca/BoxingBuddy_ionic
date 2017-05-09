System.register(["../Observable", "./ScalarObservable", "./EmptyObservable"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, ScalarObservable_1, EmptyObservable_1, ArrayLikeObservable;
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
            }
        ],
        execute: function () {
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @extends {Ignored}
             * @hide true
             */
            ArrayLikeObservable = class ArrayLikeObservable extends Observable_1.Observable {
                constructor(arrayLike, scheduler) {
                    super();
                    this.arrayLike = arrayLike;
                    this.scheduler = scheduler;
                    if (!scheduler && arrayLike.length === 1) {
                        this._isScalar = true;
                        this.value = arrayLike[0];
                    }
                }
                static create(arrayLike, scheduler) {
                    const length = arrayLike.length;
                    if (length === 0) {
                        return new EmptyObservable_1.EmptyObservable();
                    }
                    else if (length === 1) {
                        return new ScalarObservable_1.ScalarObservable(arrayLike[0], scheduler);
                    }
                    else {
                        return new ArrayLikeObservable(arrayLike, scheduler);
                    }
                }
                static dispatch(state) {
                    const { arrayLike, index, length, subscriber } = state;
                    if (subscriber.closed) {
                        return;
                    }
                    if (index >= length) {
                        subscriber.complete();
                        return;
                    }
                    subscriber.next(arrayLike[index]);
                    state.index = index + 1;
                    this.schedule(state);
                }
                _subscribe(subscriber) {
                    let index = 0;
                    const { arrayLike, scheduler } = this;
                    const length = arrayLike.length;
                    if (scheduler) {
                        return scheduler.schedule(ArrayLikeObservable.dispatch, 0, {
                            arrayLike, index, length, subscriber
                        });
                    }
                    else {
                        for (let i = 0; i < length && !subscriber.closed; i++) {
                            subscriber.next(arrayLike[i]);
                        }
                        subscriber.complete();
                    }
                }
            };
            exports_1("ArrayLikeObservable", ArrayLikeObservable);
        }
    };
});
//# sourceMappingURL=ArrayLikeObservable.js.map