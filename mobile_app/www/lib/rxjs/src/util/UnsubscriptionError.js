System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var UnsubscriptionError;
    return {
        setters: [],
        execute: function () {
            /**
             * An error thrown when one or more errors have occurred during the
             * `unsubscribe` of a {@link Subscription}.
             */
            UnsubscriptionError = class UnsubscriptionError extends Error {
                constructor(errors) {
                    super();
                    this.errors = errors;
                    const err = Error.call(this, errors ?
                        `${errors.length} errors occurred during unsubscription:
  ${errors.map((err, i) => `${i + 1}) ${err.toString()}`).join('\n  ')}` : '');
                    this.name = err.name = 'UnsubscriptionError';
                    this.stack = err.stack;
                    this.message = err.message;
                }
            };
            exports_1("UnsubscriptionError", UnsubscriptionError);
        }
    };
});
//# sourceMappingURL=UnsubscriptionError.js.map