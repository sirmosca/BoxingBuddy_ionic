System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TimeoutError;
    return {
        setters: [],
        execute: function () {
            /**
             * An error thrown when duetime elapses.
             *
             * @see {@link timeout}
             *
             * @class TimeoutError
             */
            TimeoutError = class TimeoutError extends Error {
                constructor() {
                    const err = super('Timeout has occurred');
                    this.name = err.name = 'TimeoutError';
                    this.stack = err.stack;
                    this.message = err.message;
                }
            };
            exports_1("TimeoutError", TimeoutError);
        }
    };
});
//# sourceMappingURL=TimeoutError.js.map