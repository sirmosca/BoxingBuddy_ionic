System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var root;
    return {
        setters: [],
        execute: function () {
            if (typeof window == 'object' && window.window === window) {
                exports_1("root", root = window);
            }
            else if (typeof self == 'object' && self.self === self) {
                exports_1("root", root = self);
            }
            else if (typeof global == 'object' && global.global === global) {
                exports_1("root", root = global);
            }
            else {
                // Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.
                // This is needed when used with angular/tsickle which inserts a goog.module statement.
                // Wrap in IIFE
                (function () {
                    throw new Error('RxJS could not find any global context (window, self, global)');
                })();
            }
        }
    };
});
//# sourceMappingURL=root.js.map