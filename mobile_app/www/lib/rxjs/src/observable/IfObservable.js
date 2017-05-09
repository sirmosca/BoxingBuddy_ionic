System.register(["../Observable", "../util/subscribeToResult", "../OuterSubscriber"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, subscribeToResult_1, OuterSubscriber_1, IfObservable, IfSubscriber;
    return {
        setters: [
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
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
            IfObservable = class IfObservable extends Observable_1.Observable {
                constructor(condition, thenSource, elseSource) {
                    super();
                    this.condition = condition;
                    this.thenSource = thenSource;
                    this.elseSource = elseSource;
                }
                static create(condition, thenSource, elseSource) {
                    return new IfObservable(condition, thenSource, elseSource);
                }
                _subscribe(subscriber) {
                    const { condition, thenSource, elseSource } = this;
                    return new IfSubscriber(subscriber, condition, thenSource, elseSource);
                }
            };
            exports_1("IfObservable", IfObservable);
            IfSubscriber = class IfSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, condition, thenSource, elseSource) {
                    super(destination);
                    this.condition = condition;
                    this.thenSource = thenSource;
                    this.elseSource = elseSource;
                    this.tryIf();
                }
                tryIf() {
                    const { condition, thenSource, elseSource } = this;
                    let result;
                    try {
                        result = condition();
                        const source = result ? thenSource : elseSource;
                        if (source) {
                            this.add(subscribeToResult_1.subscribeToResult(this, source));
                        }
                        else {
                            this._complete();
                        }
                    }
                    catch (err) {
                        this._error(err);
                    }
                }
            };
        }
    };
});
//# sourceMappingURL=IfObservable.js.map