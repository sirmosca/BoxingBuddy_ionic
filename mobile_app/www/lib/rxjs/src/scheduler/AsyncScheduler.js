System.register(["../Scheduler"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Scheduler_1, AsyncScheduler;
    return {
        setters: [
            function (Scheduler_1_1) {
                Scheduler_1 = Scheduler_1_1;
            }
        ],
        execute: function () {
            AsyncScheduler = class AsyncScheduler extends Scheduler_1.Scheduler {
                constructor() {
                    super(...arguments);
                    this.actions = [];
                    /**
                     * A flag to indicate whether the Scheduler is currently executing a batch of
                     * queued actions.
                     * @type {boolean}
                     */
                    this.active = false;
                    /**
                     * An internal ID used to track the latest asynchronous task such as those
                     * coming from `setTimeout`, `setInterval`, `requestAnimationFrame`, and
                     * others.
                     * @type {any}
                     */
                    this.scheduled = undefined;
                }
                flush(action) {
                    const { actions } = this;
                    if (this.active) {
                        actions.push(action);
                        return;
                    }
                    let error;
                    this.active = true;
                    do {
                        if (error = action.execute(action.state, action.delay)) {
                            break;
                        }
                    } while (action = actions.shift()); // exhaust the scheduler queue
                    this.active = false;
                    if (error) {
                        while (action = actions.shift()) {
                            action.unsubscribe();
                        }
                        throw error;
                    }
                }
            };
            exports_1("AsyncScheduler", AsyncScheduler);
        }
    };
});
//# sourceMappingURL=AsyncScheduler.js.map