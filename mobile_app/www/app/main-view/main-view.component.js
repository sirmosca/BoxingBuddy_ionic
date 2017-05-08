System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MainViewController;
    return {
        setters: [],
        execute: function () {
            MainViewController = class MainViewController {
                constructor(Settings) {
                    this.Settings = Settings;
                    this.enterRing = function () {
                        this.Settings.navigate("/enterRing");
                    };
                    this.goToSettings = function () {
                        this.Settings.navigate("/settings");
                    };
                    this.viewGlossary = function () {
                        this.Settings.navigate("/glossary");
                    };
                    this.practiceCombos = function () {
                        this.Settings.navigate("/combos");
                    };
                }
            };
            MainViewController.$inject = ['Settings'];
            exports_1("MainViewController", MainViewController);
        }
    };
});
//# sourceMappingURL=main-view.component.js.map