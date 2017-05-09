System.register(["../util/root"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function symbolIteratorPonyfill(root) {
        const Symbol = root.Symbol;
        if (typeof Symbol === 'function') {
            if (!Symbol.iterator) {
                Symbol.iterator = Symbol('iterator polyfill');
            }
            return Symbol.iterator;
        }
        else {
            // [for Mozilla Gecko 27-35:](https://mzl.la/2ewE1zC)
            const { Set } = root;
            if (Set && typeof new Set()['@@iterator'] === 'function') {
                return '@@iterator';
            }
            const { Map } = root;
            // required for compatability with es6-shim
            if (Map) {
                let keys = Object.getOwnPropertyNames(Map.prototype);
                for (let i = 0; i < keys.length; ++i) {
                    let key = keys[i];
                    // according to spec, Map.prototype[@@iterator] and Map.orototype.entries must be equal.
                    if (key !== 'entries' && key !== 'size' && Map.prototype[key] === Map.prototype['entries']) {
                        return key;
                    }
                }
            }
            return '@@iterator';
        }
    }
    exports_1("symbolIteratorPonyfill", symbolIteratorPonyfill);
    var root_1, iterator, $$iterator;
    return {
        setters: [
            function (root_1_1) {
                root_1 = root_1_1;
            }
        ],
        execute: function () {
            exports_1("iterator", iterator = symbolIteratorPonyfill(root_1.root));
            /**
             * @deprecated use iterator instead
             */
            exports_1("$$iterator", $$iterator = iterator);
        }
    };
});
//# sourceMappingURL=iterator.js.map