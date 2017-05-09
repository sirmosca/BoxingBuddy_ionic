System.register(["./root"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function assignImpl(target, ...sources) {
        const len = sources.length;
        for (let i = 0; i < len; i++) {
            const source = sources[i];
            for (let k in source) {
                if (source.hasOwnProperty(k)) {
                    target[k] = source[k];
                }
            }
        }
        return target;
    }
    exports_1("assignImpl", assignImpl);
    function getAssign(root) {
        return root.Object.assign || assignImpl;
    }
    exports_1("getAssign", getAssign);
    var root_1, assign;
    return {
        setters: [
            function (root_1_1) {
                root_1 = root_1_1;
            }
        ],
        execute: function () {
            ;
            exports_1("assign", assign = getAssign(root_1.root));
        }
    };
});
//# sourceMappingURL=assign.js.map