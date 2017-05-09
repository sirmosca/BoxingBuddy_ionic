System.register(["../Observable", "../util/subscribeToResult", "../OuterSubscriber"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, subscribeToResult_1, OuterSubscriber_1, UsingObservable, UsingSubscriber;
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
            UsingObservable = class UsingObservable extends Observable_1.Observable {
                constructor(resourceFactory, observableFactory) {
                    super();
                    this.resourceFactory = resourceFactory;
                    this.observableFactory = observableFactory;
                }
                static create(resourceFactory, observableFactory) {
                    return new UsingObservable(resourceFactory, observableFactory);
                }
                _subscribe(subscriber) {
                    const { resourceFactory, observableFactory } = this;
                    let resource;
                    try {
                        resource = resourceFactory();
                        return new UsingSubscriber(subscriber, resource, observableFactory);
                    }
                    catch (err) {
                        subscriber.error(err);
                    }
                }
            };
            exports_1("UsingObservable", UsingObservable);
            UsingSubscriber = class UsingSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, resource, observableFactory) {
                    super(destination);
                    this.resource = resource;
                    this.observableFactory = observableFactory;
                    destination.add(resource);
                    this.tryUse();
                }
                tryUse() {
                    try {
                        const source = this.observableFactory.call(this, this.resource);
                        if (source) {
                            this.add(subscribeToResult_1.subscribeToResult(this, source));
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
//# sourceMappingURL=UsingObservable.js.map