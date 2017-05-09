System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ObjectUnsubscribedError;
    return {
        setters: [],
        execute: function () {
            /**
             * An error thrown when an action is invalid because the object has been
             * unsubscribed.
             *
             * @see {@link Subject}
             * @see {@link BehaviorSubject}
             *
             * @class ObjectUnsubscribedError
             */
            ObjectUnsubscribedError = class ObjectUnsubscribedError extends Error {
                constructor() {
                    const err = super('object unsubscribed');
                    this.name = err.name = 'ObjectUnsubscribedError';
                    this.stack = err.stack;
                    this.message = err.message;
                }
            };
            exports_1("ObjectUnsubscribedError", ObjectUnsubscribedError);
        }
    };
});
//# sourceMappingURL=ObjectUnsubscribedError.js.map