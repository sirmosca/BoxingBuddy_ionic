System.register(["../util/isArray", "../observable/ArrayObservable", "../OuterSubscriber", "../util/subscribeToResult"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /* tslint:enable:max-line-length */
    /**
     * Returns an Observable that mirrors the first source Observable to emit an item
     * from the combination of this Observable and supplied Observables.
     * @param {...Observables} ...observables Sources used to race for which Observable emits first.
     * @return {Observable} An Observable that mirrors the output of the first Observable to emit an item.
     * @method race
     * @owner Observable
     */
    function race(...observables) {
        // if the only argument is an array, it was most likely called with
        // `pair([obs1, obs2, ...])`
        if (observables.length === 1 && isArray_1.isArray(observables[0])) {
            observables = observables[0];
        }
        return this.lift.call(raceStatic(this, ...observables));
    }
    exports_1("race", race);
    function raceStatic(...observables) {
        // if the only argument is an array, it was most likely called with
        // `pair([obs1, obs2, ...])`
        if (observables.length === 1) {
            if (isArray_1.isArray(observables[0])) {
                observables = observables[0];
            }
            else {
                return observables[0];
            }
        }
        return new ArrayObservable_1.ArrayObservable(observables).lift(new RaceOperator());
    }
    exports_1("raceStatic", raceStatic);
    var isArray_1, ArrayObservable_1, OuterSubscriber_1, subscribeToResult_1, RaceOperator, RaceSubscriber;
    return {
        setters: [
            function (isArray_1_1) {
                isArray_1 = isArray_1_1;
            },
            function (ArrayObservable_1_1) {
                ArrayObservable_1 = ArrayObservable_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }
        ],
        execute: function () {
            RaceOperator = class RaceOperator {
                call(subscriber, source) {
                    return source.subscribe(new RaceSubscriber(subscriber));
                }
            };
            exports_1("RaceOperator", RaceOperator);
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            RaceSubscriber = class RaceSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination) {
                    super(destination);
                    this.hasFirst = false;
                    this.observables = [];
                    this.subscriptions = [];
                }
                _next(observable) {
                    this.observables.push(observable);
                }
                _complete() {
                    const observables = this.observables;
                    const len = observables.length;
                    if (len === 0) {
                        this.destination.complete();
                    }
                    else {
                        for (let i = 0; i < len && !this.hasFirst; i++) {
                            let observable = observables[i];
                            let subscription = subscribeToResult_1.subscribeToResult(this, observable, observable, i);
                            if (this.subscriptions) {
                                this.subscriptions.push(subscription);
                            }
                            this.add(subscription);
                        }
                        this.observables = null;
                    }
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    if (!this.hasFirst) {
                        this.hasFirst = true;
                        for (let i = 0; i < this.subscriptions.length; i++) {
                            if (i !== outerIndex) {
                                let subscription = this.subscriptions[i];
                                subscription.unsubscribe();
                                this.remove(subscription);
                            }
                        }
                        this.subscriptions = null;
                    }
                    this.destination.next(innerValue);
                }
            };
            exports_1("RaceSubscriber", RaceSubscriber);
        }
    };
});
//# sourceMappingURL=race.js.map