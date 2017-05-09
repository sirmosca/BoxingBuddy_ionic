System.register(["./AsyncScheduler"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AsyncScheduler_1, AsapScheduler;
    return {
        setters: [
            function (AsyncScheduler_1_1) {
                AsyncScheduler_1 = AsyncScheduler_1_1;
            }
        ],
        execute: function () {
            AsapScheduler = class AsapScheduler extends AsyncScheduler_1.AsyncScheduler {
                flush(action) {
                    this.active = true;
                    this.scheduled = undefined;
                    const { actions } = this;
                    let error;
                    let index = -1;
                    let count = actions.length;
                    action = action || actions.shift();
                    do {
                        if (error = action.execute(action.state, action.delay)) {
                            break;
                        }
                    } while (++index < count && (action = actions.shift()));
                    this.active = false;
                    if (error) {
                        while (++index < count && (action = actions.shift())) {
                            action.unsubscribe();
                        }
                        throw error;
                    }
                }
            };
            exports_1("AsapScheduler", AsapScheduler);
        }
    };
});
//# sourceMappingURL=AsapScheduler.js.map