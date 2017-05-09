System.register(["./Subject", "./Subscription"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subject_1, Subscription_1, AsyncSubject;
    return {
        setters: [
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            }
        ],
        execute: function () {
            /**
             * @class AsyncSubject<T>
             */
            AsyncSubject = class AsyncSubject extends Subject_1.Subject {
                constructor() {
                    super(...arguments);
                    this.value = null;
                    this.hasNext = false;
                    this.hasCompleted = false;
                }
                _subscribe(subscriber) {
                    if (this.hasError) {
                        subscriber.error(this.thrownError);
                        return Subscription_1.Subscription.EMPTY;
                    }
                    else if (this.hasCompleted && this.hasNext) {
                        subscriber.next(this.value);
                        subscriber.complete();
                        return Subscription_1.Subscription.EMPTY;
                    }
                    return super._subscribe(subscriber);
                }
                next(value) {
                    if (!this.hasCompleted) {
                        this.value = value;
                        this.hasNext = true;
                    }
                }
                error(error) {
                    if (!this.hasCompleted) {
                        super.error(error);
                    }
                }
                complete() {
                    this.hasCompleted = true;
                    if (this.hasNext) {
                        super.next(this.value);
                    }
                    super.complete();
                }
            };
            exports_1("AsyncSubject", AsyncSubject);
        }
    };
});
//# sourceMappingURL=AsyncSubject.js.map