System.register(["./Subscription"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscription_1, SubjectSubscription;
    return {
        setters: [
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            }
        ],
        execute: function () {
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            SubjectSubscription = class SubjectSubscription extends Subscription_1.Subscription {
                constructor(subject, subscriber) {
                    super();
                    this.subject = subject;
                    this.subscriber = subscriber;
                    this.closed = false;
                }
                unsubscribe() {
                    if (this.closed) {
                        return;
                    }
                    this.closed = true;
                    const subject = this.subject;
                    const observers = subject.observers;
                    this.subject = null;
                    if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
                        return;
                    }
                    const subscriberIndex = observers.indexOf(this.subscriber);
                    if (subscriberIndex !== -1) {
                        observers.splice(subscriberIndex, 1);
                    }
                }
            };
            exports_1("SubjectSubscription", SubjectSubscription);
        }
    };
});
//# sourceMappingURL=SubjectSubscription.js.map