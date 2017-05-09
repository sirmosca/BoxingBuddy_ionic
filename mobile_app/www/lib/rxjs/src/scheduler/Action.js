System.register(["../Subscription"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscription_1, Action;
    return {
        setters: [
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            }
        ],
        execute: function () {
            /**
             * A unit of work to be executed in a {@link Scheduler}. An action is typically
             * created from within a Scheduler and an RxJS user does not need to concern
             * themselves about creating and manipulating an Action.
             *
             * ```ts
             * class Action<T> extends Subscription {
             *   new (scheduler: Scheduler, work: (state?: T) => void);
             *   schedule(state?: T, delay: number = 0): Subscription;
             * }
             * ```
             *
             * @class Action<T>
             */
            Action = class Action extends Subscription_1.Subscription {
                constructor(scheduler, work) {
                    super();
                }
                /**
                 * Schedules this action on its parent Scheduler for execution. May be passed
                 * some context object, `state`. May happen at some point in the future,
                 * according to the `delay` parameter, if specified.
                 * @param {T} [state] Some contextual data that the `work` function uses when
                 * called by the Scheduler.
                 * @param {number} [delay] Time to wait before executing the work, where the
                 * time unit is implicit and defined by the Scheduler.
                 * @return {void}
                 */
                schedule(state, delay = 0) {
                    return this;
                }
            };
            exports_1("Action", Action);
        }
    };
});
//# sourceMappingURL=Action.js.map