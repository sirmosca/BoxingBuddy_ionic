System.register(["../observable/FromObservable", "../util/isArray", "../OuterSubscriber", "../util/subscribeToResult"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /* tslint:enable:max-line-length */
    function onErrorResumeNext(...nextSources) {
        if (nextSources.length === 1 && isArray_1.isArray(nextSources[0])) {
            nextSources = nextSources[0];
        }
        return this.lift(new OnErrorResumeNextOperator(nextSources));
    }
    exports_1("onErrorResumeNext", onErrorResumeNext);
    /* tslint:enable:max-line-length */
    function onErrorResumeNextStatic(...nextSources) {
        let source = null;
        if (nextSources.length === 1 && isArray_1.isArray(nextSources[0])) {
            nextSources = nextSources[0];
        }
        source = nextSources.shift();
        return new FromObservable_1.FromObservable(source, null).lift(new OnErrorResumeNextOperator(nextSources));
    }
    exports_1("onErrorResumeNextStatic", onErrorResumeNextStatic);
    var FromObservable_1, isArray_1, OuterSubscriber_1, subscribeToResult_1, OnErrorResumeNextOperator, OnErrorResumeNextSubscriber;
    return {
        setters: [
            function (FromObservable_1_1) {
                FromObservable_1 = FromObservable_1_1;
            },
            function (isArray_1_1) {
                isArray_1 = isArray_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }
        ],
        execute: function () {
            OnErrorResumeNextOperator = class OnErrorResumeNextOperator {
                constructor(nextSources) {
                    this.nextSources = nextSources;
                }
                call(subscriber, source) {
                    return source.subscribe(new OnErrorResumeNextSubscriber(subscriber, this.nextSources));
                }
            };
            OnErrorResumeNextSubscriber = class OnErrorResumeNextSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, nextSources) {
                    super(destination);
                    this.destination = destination;
                    this.nextSources = nextSources;
                }
                notifyError(error, innerSub) {
                    this.subscribeToNextSource();
                }
                notifyComplete(innerSub) {
                    this.subscribeToNextSource();
                }
                _error(err) {
                    this.subscribeToNextSource();
                }
                _complete() {
                    this.subscribeToNextSource();
                }
                subscribeToNextSource() {
                    const next = this.nextSources.shift();
                    if (next) {
                        this.add(subscribeToResult_1.subscribeToResult(this, next));
                    }
                    else {
                        this.destination.complete();
                    }
                }
            };
        }
    };
});
//# sourceMappingURL=onErrorResumeNext.js.map