System.register(["../Observable", "./EmptyObservable", "../util/isArray", "../util/subscribeToResult", "../OuterSubscriber"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, EmptyObservable_1, isArray_1, subscribeToResult_1, OuterSubscriber_1, ForkJoinObservable, ForkJoinSubscriber;
    return {
        setters: [
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (EmptyObservable_1_1) {
                EmptyObservable_1 = EmptyObservable_1_1;
            },
            function (isArray_1_1) {
                isArray_1 = isArray_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            }
        ],
        execute: function () {
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @extends {Ignored}
             * @hide true
             */
            ForkJoinObservable = class ForkJoinObservable extends Observable_1.Observable {
                constructor(sources, resultSelector) {
                    super();
                    this.sources = sources;
                    this.resultSelector = resultSelector;
                }
                /* tslint:enable:max-line-length */
                /**
                 * @param sources
                 * @return {any}
                 * @static true
                 * @name forkJoin
                 * @owner Observable
                 */
                static create(...sources) {
                    if (sources === null || arguments.length === 0) {
                        return new EmptyObservable_1.EmptyObservable();
                    }
                    let resultSelector = null;
                    if (typeof sources[sources.length - 1] === 'function') {
                        resultSelector = sources.pop();
                    }
                    // if the first and only other argument besides the resultSelector is an array
                    // assume it's been called with `forkJoin([obs1, obs2, obs3], resultSelector)`
                    if (sources.length === 1 && isArray_1.isArray(sources[0])) {
                        sources = sources[0];
                    }
                    if (sources.length === 0) {
                        return new EmptyObservable_1.EmptyObservable();
                    }
                    return new ForkJoinObservable(sources, resultSelector);
                }
                _subscribe(subscriber) {
                    return new ForkJoinSubscriber(subscriber, this.sources, this.resultSelector);
                }
            };
            exports_1("ForkJoinObservable", ForkJoinObservable);
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            ForkJoinSubscriber = class ForkJoinSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, sources, resultSelector) {
                    super(destination);
                    this.sources = sources;
                    this.resultSelector = resultSelector;
                    this.completed = 0;
                    this.haveValues = 0;
                    const len = sources.length;
                    this.total = len;
                    this.values = new Array(len);
                    for (let i = 0; i < len; i++) {
                        const source = sources[i];
                        const innerSubscription = subscribeToResult_1.subscribeToResult(this, source, null, i);
                        if (innerSubscription) {
                            innerSubscription.outerIndex = i;
                            this.add(innerSubscription);
                        }
                    }
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.values[outerIndex] = innerValue;
                    if (!innerSub._hasValue) {
                        innerSub._hasValue = true;
                        this.haveValues++;
                    }
                }
                notifyComplete(innerSub) {
                    const destination = this.destination;
                    const { haveValues, resultSelector, values } = this;
                    const len = values.length;
                    if (!innerSub._hasValue) {
                        destination.complete();
                        return;
                    }
                    this.completed++;
                    if (this.completed !== len) {
                        return;
                    }
                    if (haveValues === len) {
                        const value = resultSelector ? resultSelector.apply(this, values) : values;
                        destination.next(value);
                    }
                    destination.complete();
                }
            };
        }
    };
});
//# sourceMappingURL=ForkJoinObservable.js.map