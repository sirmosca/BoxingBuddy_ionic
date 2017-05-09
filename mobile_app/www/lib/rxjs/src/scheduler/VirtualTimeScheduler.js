System.register(["./AsyncAction", "./AsyncScheduler"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AsyncAction_1, AsyncScheduler_1, VirtualTimeScheduler, VirtualAction;
    return {
        setters: [
            function (AsyncAction_1_1) {
                AsyncAction_1 = AsyncAction_1_1;
            },
            function (AsyncScheduler_1_1) {
                AsyncScheduler_1 = AsyncScheduler_1_1;
            }
        ],
        execute: function () {
            VirtualTimeScheduler = class VirtualTimeScheduler extends AsyncScheduler_1.AsyncScheduler {
                constructor(SchedulerAction = VirtualAction, maxFrames = Number.POSITIVE_INFINITY) {
                    super(SchedulerAction, () => this.frame);
                    this.maxFrames = maxFrames;
                    this.frame = 0;
                    this.index = -1;
                }
                /**
                 * Prompt the Scheduler to execute all of its queued actions, therefore
                 * clearing its queue.
                 * @return {void}
                 */
                flush() {
                    const { actions, maxFrames } = this;
                    let error, action;
                    while ((action = actions.shift()) && (this.frame = action.delay) <= maxFrames) {
                        if (error = action.execute(action.state, action.delay)) {
                            break;
                        }
                    }
                    if (error) {
                        while (action = actions.shift()) {
                            action.unsubscribe();
                        }
                        throw error;
                    }
                }
            };
            VirtualTimeScheduler.frameTimeFactor = 10;
            exports_1("VirtualTimeScheduler", VirtualTimeScheduler);
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            VirtualAction = class VirtualAction extends AsyncAction_1.AsyncAction {
                constructor(scheduler, work, index = scheduler.index += 1) {
                    super(scheduler, work);
                    this.scheduler = scheduler;
                    this.work = work;
                    this.index = index;
                    this.active = true;
                    this.index = scheduler.index = index;
                }
                schedule(state, delay = 0) {
                    if (!this.id) {
                        return super.schedule(state, delay);
                    }
                    this.active = false;
                    // If an action is rescheduled, we save allocations by mutating its state,
                    // pushing it to the end of the scheduler queue, and recycling the action.
                    // But since the VirtualTimeScheduler is used for testing, VirtualActions
                    // must be immutable so they can be inspected later.
                    const action = new VirtualAction(this.scheduler, this.work);
                    this.add(action);
                    return action.schedule(state, delay);
                }
                requestAsyncId(scheduler, id, delay = 0) {
                    this.delay = scheduler.frame + delay;
                    const { actions } = scheduler;
                    actions.push(this);
                    actions.sort(VirtualAction.sortActions);
                    return true;
                }
                recycleAsyncId(scheduler, id, delay = 0) {
                    return undefined;
                }
                _execute(state, delay) {
                    if (this.active === true) {
                        return super._execute(state, delay);
                    }
                }
                static sortActions(a, b) {
                    if (a.delay === b.delay) {
                        if (a.index === b.index) {
                            return 0;
                        }
                        else if (a.index > b.index) {
                            return 1;
                        }
                        else {
                            return -1;
                        }
                    }
                    else if (a.delay > b.delay) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                }
            };
            exports_1("VirtualAction", VirtualAction);
        }
    };
});
//# sourceMappingURL=VirtualTimeScheduler.js.map