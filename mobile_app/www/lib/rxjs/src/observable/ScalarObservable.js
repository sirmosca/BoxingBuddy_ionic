System.register(["../Observable"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, ScalarObservable;
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
            ScalarObservable = class ScalarObservable extends Observable_1.Observable {
                constructor(value, scheduler) {
                    super();
                    this.value = value;
                    this.scheduler = scheduler;
                    this._isScalar = true;
                    if (scheduler) {
                        this._isScalar = false;
                    }
                }
                static create(value, scheduler) {
                    return new ScalarObservable(value, scheduler);
                }
                static dispatch(state) {
                    const { done, value, subscriber } = state;
                    if (done) {
                        subscriber.complete();
                        return;
                    }
                    subscriber.next(value);
                    if (subscriber.closed) {
                        return;
                    }
                    state.done = true;
                    this.schedule(state);
                }
                _subscribe(subscriber) {
                    const value = this.value;
                    const scheduler = this.scheduler;
                    if (scheduler) {
                        return scheduler.schedule(ScalarObservable.dispatch, 0, {
                            done: false, value, subscriber
                        });
                    }
                    else {
                        subscriber.next(value);
                        if (!subscriber.closed) {
                            subscriber.complete();
                        }
                    }
                }
            };
            exports_1("ScalarObservable", ScalarObservable);
        }
    };
});
//# sourceMappingURL=ScalarObservable.js.map