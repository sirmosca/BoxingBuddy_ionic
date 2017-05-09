System.register(["./AsyncAction"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AsyncAction_1, QueueAction;
    return {
        setters: [
            function (AsyncAction_1_1) {
                AsyncAction_1 = AsyncAction_1_1;
            }
        ],
        execute: function () {
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            QueueAction = class QueueAction extends AsyncAction_1.AsyncAction {
                constructor(scheduler, work) {
                    super(scheduler, work);
                    this.scheduler = scheduler;
                    this.work = work;
                }
                schedule(state, delay = 0) {
                    if (delay > 0) {
                        return super.schedule(state, delay);
                    }
                    this.delay = delay;
                    this.state = state;
                    this.scheduler.flush(this);
                    return this;
                }
                execute(state, delay) {
                    return (delay > 0 || this.closed) ?
                        super.execute(state, delay) :
                        this._execute(state, delay);
                }
                requestAsyncId(scheduler, id, delay = 0) {
                    // If delay exists and is greater than 0, or if the delay is null (the
                    // action wasn't rescheduled) but was originally scheduled as an async
                    // action, then recycle as an async action.
                    if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
                        return super.requestAsyncId(scheduler, id, delay);
                    }
                    // Otherwise flush the scheduler starting with this action.
                    return scheduler.flush(this);
                }
            };
            exports_1("QueueAction", QueueAction);
        }
    };
});
//# sourceMappingURL=QueueAction.js.map