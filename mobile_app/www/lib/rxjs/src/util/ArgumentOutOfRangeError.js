System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ArgumentOutOfRangeError;
    return {
        setters: [],
        execute: function () {
            /**
             * An error thrown when an element was queried at a certain index of an
             * Observable, but no such index or position exists in that sequence.
             *
             * @see {@link elementAt}
             * @see {@link take}
             * @see {@link takeLast}
             *
             * @class ArgumentOutOfRangeError
             */
            ArgumentOutOfRangeError = class ArgumentOutOfRangeError extends Error {
                constructor() {
                    const err = super('argument out of range');
                    this.name = err.name = 'ArgumentOutOfRangeError';
                    this.stack = err.stack;
                    this.message = err.message;
                }
            };
            exports_1("ArgumentOutOfRangeError", ArgumentOutOfRangeError);
        }
    };
});
//# sourceMappingURL=ArgumentOutOfRangeError.js.map