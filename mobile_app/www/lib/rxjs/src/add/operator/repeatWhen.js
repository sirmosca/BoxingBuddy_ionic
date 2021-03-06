System.register(["../../Observable", "../../operator/repeatWhen"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, repeatWhen_1;
    return {
        setters: [
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (repeatWhen_1_1) {
                repeatWhen_1 = repeatWhen_1_1;
            }
        ],
        execute: function () {
            Observable_1.Observable.prototype.repeatWhen = repeatWhen_1.repeatWhen;
        }
    };
});
//# sourceMappingURL=repeatWhen.js.map