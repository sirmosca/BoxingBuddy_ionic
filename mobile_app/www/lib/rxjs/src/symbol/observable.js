System.register(["../util/root"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function getSymbolObservable(context) {
        let $$observable;
        let Symbol = context.Symbol;
        if (typeof Symbol === 'function') {
            if (Symbol.observable) {
                $$observable = Symbol.observable;
            }
            else {
                $$observable = Symbol('observable');
                Symbol.observable = $$observable;
            }
        }
        else {
            $$observable = '@@observable';
        }
        return $$observable;
    }
    exports_1("getSymbolObservable", getSymbolObservable);
    var root_1, observable, $$observable;
    return {
        setters: [
            function (root_1_1) {
                root_1 = root_1_1;
            }
        ],
        execute: function () {
            exports_1("observable", observable = getSymbolObservable(root_1.root));
            /**
             * @deprecated use observable instead
             */
            exports_1("$$observable", $$observable = observable);
        }
    };
});
//# sourceMappingURL=observable.js.map