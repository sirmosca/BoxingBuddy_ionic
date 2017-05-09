System.register(["./AsyncScheduler"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AsyncScheduler_1, QueueScheduler;
    return {
        setters: [
            function (AsyncScheduler_1_1) {
                AsyncScheduler_1 = AsyncScheduler_1_1;
            }
        ],
        execute: function () {
            QueueScheduler = class QueueScheduler extends AsyncScheduler_1.AsyncScheduler {
            };
            exports_1("QueueScheduler", QueueScheduler);
        }
    };
});
//# sourceMappingURL=QueueScheduler.js.map