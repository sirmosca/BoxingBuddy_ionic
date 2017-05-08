System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SettingsViewController;
    return {
        setters: [],
        execute: function () {
            SettingsViewController = class SettingsViewController {
                constructor(Settings) {
                    this.Settings = Settings;
                    this.saveRoundTime = function () {
                        Settings.setRoundTime(this.roundTime * 1000);
                    };
                    this.saveMaxRounds = function () {
                        Settings.setMaxRounds(this.maxRounds);
                    };
                    this.saveTimeBetweenPunches = function () {
                        Settings.setTimeBetweenPunches(this.timeBetweenPunches * 1000);
                    };
                    this.saveTimeBetweenCombos = function () {
                        Settings.setTimeBetweenCombos(this.timeBetweenCombos * 1000);
                    };
                    this.saveRoundIntermission = function () {
                        Settings.setRoundIntermission(this.roundIntermission * 1000);
                    };
                    this.saveDisplayType = function () {
                        Settings.setDisplayType(this.displayType);
                    };
                    this.roundTime = Settings.getRoundTime() / 1000;
                    this.maxRounds = Settings.getMaxRounds();
                    this.timeBetweenPunches = Settings.getTimeBetweenPunches() / 1000;
                    this.roundIntermission = Settings.getRoundIntermission() / 1000;
                    this.displayType = Settings.getDisplayType();
                    this.timeBetweenCombos = Settings.getTimeBetweenCombos() / 1000;
                }
            };
            SettingsViewController.$inject = ['Settings'];
            exports_1("SettingsViewController", SettingsViewController);
        }
    };
});
//# sourceMappingURL=settings-view.component.js.map