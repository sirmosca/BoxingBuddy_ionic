System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var GlossaryViewController;
    return {
        setters: [],
        execute: function () {
            GlossaryViewController = class GlossaryViewController {
                constructor(Settings, Combination) {
                    this.Settings = Settings;
                    this.Combination = Combination;
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
                    this.formatPunches = function () {
                        if (this.selectedCombo === null)
                            return;
                        var combo = this.selectedCombo;
                        var output = "";
                        for (var i = 0; i < combo.punchNames.length; i++) {
                            output += combo.punchNames[i] + " (" + combo.punchNumbers[i] + "), ";
                        }
                        return output;
                    };
                    this.getName = function () {
                        return this.selectedCombo === null ? "" : this.selectedCombo.name;
                    };
                    this.selectCombo = function (combo) {
                        this.selectedCombo = combo;
                    };
                }
            };
            GlossaryViewController.$inject = ['Settings', 'Combination'];
            exports_1("GlossaryViewController", GlossaryViewController);
        }
    };
});
//# sourceMappingURL=glossary-view.component.js.map