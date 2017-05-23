System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ComboTeachingViewController;
    return {
        setters: [],
        execute: function () {
            ComboTeachingViewController = class ComboTeachingViewController {
                constructor(Settings, Combination, Speech) {
                    this.combos = [];
                    this.$onInit = function () {
                        this.combos = [];
                        this.selectedCombo = null;
                        var c = [];
                        Combination.query().then(function (resp) {
                            angular.forEach(resp, (v, k) => c.push(v), {});
                        });
                        this.combos = c;
                    };
                }
            };
            ComboTeachingViewController.$inject = ['Settings', 'Combination', 'Speech'];
            exports_1("ComboTeachingViewController", ComboTeachingViewController);
        }
    };
});
//# sourceMappingURL=combo-teaching-view.component.js.map