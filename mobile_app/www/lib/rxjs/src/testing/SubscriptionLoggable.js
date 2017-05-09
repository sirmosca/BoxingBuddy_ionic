System.register(["./SubscriptionLog"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SubscriptionLog_1, SubscriptionLoggable;
    return {
        setters: [
            function (SubscriptionLog_1_1) {
                SubscriptionLog_1 = SubscriptionLog_1_1;
            }
        ],
        execute: function () {
            SubscriptionLoggable = class SubscriptionLoggable {
                constructor() {
                    this.subscriptions = [];
                }
                logSubscribedFrame() {
                    this.subscriptions.push(new SubscriptionLog_1.SubscriptionLog(this.scheduler.now()));
                    return this.subscriptions.length - 1;
                }
                logUnsubscribedFrame(index) {
                    const subscriptionLogs = this.subscriptions;
                    const oldSubscriptionLog = subscriptionLogs[index];
                    subscriptionLogs[index] = new SubscriptionLog_1.SubscriptionLog(oldSubscriptionLog.subscribedFrame, this.scheduler.now());
                }
            };
            exports_1("SubscriptionLoggable", SubscriptionLoggable);
        }
    };
});
//# sourceMappingURL=SubscriptionLoggable.js.map