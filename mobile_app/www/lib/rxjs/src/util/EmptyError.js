System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var EmptyError;
    return {
        setters: [],
        execute: function () {
            /**
             * An error thrown when an Observable or a sequence was queried but has no
             * elements.
             *
             * @see {@link first}
             * @see {@link last}
             * @see {@link single}
             *
             * @class EmptyError
             */
            EmptyError = class EmptyError extends Error {
                constructor() {
                    const err = super('no elements in sequence');
                    this.name = err.name = 'EmptyError';
                    this.stack = err.stack;
                    this.message = err.message;
                }
            };
            exports_1("EmptyError", EmptyError);
        }
    };
});
//# sourceMappingURL=EmptyError.js.map