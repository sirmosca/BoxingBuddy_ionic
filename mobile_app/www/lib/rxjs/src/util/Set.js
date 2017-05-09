System.register(["./root"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function minimalSetImpl() {
        // THIS IS NOT a full impl of Set, this is just the minimum
        // bits of functionality we need for this library.
        return class MinimalSet {
            constructor() {
                this._values = [];
            }
            add(value) {
                if (!this.has(value)) {
                    this._values.push(value);
                }
            }
            has(value) {
                return this._values.indexOf(value) !== -1;
            }
            get size() {
                return this._values.length;
            }
            clear() {
                this._values.length = 0;
            }
        };
    }
    exports_1("minimalSetImpl", minimalSetImpl);
    var root_1, Set;
    return {
        setters: [
            function (root_1_1) {
                root_1 = root_1_1;
            }
        ],
        execute: function () {
            exports_1("Set", Set = root_1.root.Set || minimalSetImpl());
        }
    };
});
//# sourceMappingURL=Set.js.map