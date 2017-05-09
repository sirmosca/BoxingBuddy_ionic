System.register(["../Observable", "../util/isScheduler"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, isScheduler_1, selfSelector, GenerateObservable;
    return {
        setters: [
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (isScheduler_1_1) {
                isScheduler_1 = isScheduler_1_1;
            }
        ],
        execute: function () {
            selfSelector = (value) => value;
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @extends {Ignored}
             * @hide true
             */
            GenerateObservable = class GenerateObservable extends Observable_1.Observable {
                constructor(initialState, condition, iterate, resultSelector, scheduler) {
                    super();
                    this.initialState = initialState;
                    this.condition = condition;
                    this.iterate = iterate;
                    this.resultSelector = resultSelector;
                    this.scheduler = scheduler;
                }
                static create(initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler) {
                    if (arguments.length == 1) {
                        return new GenerateObservable(initialStateOrOptions.initialState, initialStateOrOptions.condition, initialStateOrOptions.iterate, initialStateOrOptions.resultSelector || selfSelector, initialStateOrOptions.scheduler);
                    }
                    if (resultSelectorOrObservable === undefined || isScheduler_1.isScheduler(resultSelectorOrObservable)) {
                        return new GenerateObservable(initialStateOrOptions, condition, iterate, selfSelector, resultSelectorOrObservable);
                    }
                    return new GenerateObservable(initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler);
                }
                _subscribe(subscriber) {
                    let state = this.initialState;
                    if (this.scheduler) {
                        return this.scheduler.schedule(GenerateObservable.dispatch, 0, {
                            subscriber,
                            iterate: this.iterate,
                            condition: this.condition,
                            resultSelector: this.resultSelector,
                            state
                        });
                    }
                    const { condition, resultSelector, iterate } = this;
                    do {
                        if (condition) {
                            let conditionResult;
                            try {
                                conditionResult = condition(state);
                            }
                            catch (err) {
                                subscriber.error(err);
                                return;
                            }
                            if (!conditionResult) {
                                subscriber.complete();
                                break;
                            }
                        }
                        let value;
                        try {
                            value = resultSelector(state);
                        }
                        catch (err) {
                            subscriber.error(err);
                            return;
                        }
                        subscriber.next(value);
                        if (subscriber.closed) {
                            break;
                        }
                        try {
                            state = iterate(state);
                        }
                        catch (err) {
                            subscriber.error(err);
                            return;
                        }
                    } while (true);
                }
                static dispatch(state) {
                    const { subscriber, condition } = state;
                    if (subscriber.closed) {
                        return;
                    }
                    if (state.needIterate) {
                        try {
                            state.state = state.iterate(state.state);
                        }
                        catch (err) {
                            subscriber.error(err);
                            return;
                        }
                    }
                    else {
                        state.needIterate = true;
                    }
                    if (condition) {
                        let conditionResult;
                        try {
                            conditionResult = condition(state.state);
                        }
                        catch (err) {
                            subscriber.error(err);
                            return;
                        }
                        if (!conditionResult) {
                            subscriber.complete();
                            return;
                        }
                        if (subscriber.closed) {
                            return;
                        }
                    }
                    let value;
                    try {
                        value = state.resultSelector(state.state);
                    }
                    catch (err) {
                        subscriber.error(err);
                        return;
                    }
                    if (subscriber.closed) {
                        return;
                    }
                    subscriber.next(value);
                    if (subscriber.closed) {
                        return;
                    }
                    return this.schedule(state);
                }
            };
            exports_1("GenerateObservable", GenerateObservable);
        }
    };
});
//# sourceMappingURL=GenerateObservable.js.map