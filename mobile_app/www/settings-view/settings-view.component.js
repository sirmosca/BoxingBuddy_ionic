angular
    .module('settingsView')
    .component('settingsView', {
        templateUrl: 'settings-view/settings-view.template.html',
        controller: ['Settings', 
            function SettingsViewController(Settings) {
                var self = this;
                self.roundTime = Settings.getRoundTime() / 1000;
                self.maxRounds = Settings.getMaxRounds();
                self.timeBetweenPunches = Settings.getTimeBetweenPunches() / 1000;
                self.roundIntermission = Settings.getRoundIntermission() / 1000;
                self.displayType = Settings.getDisplayType();
                self.timeBetweenCombos = Settings.getTimeBetweenCombos() / 1000;

                self.saveRoundTime = function() {
                    Settings.setRoundTime(self.roundTime * 1000);
                }

                self.saveMaxRounds = function() {
                    Settings.setMaxRounds(self.maxRounds);
                }

                self.saveTimeBetweenPunches = function() {
                    Settings.setTimeBetweenPunches(self.timeBetweenPunches * 1000);
                }

                self.saveTimeBetweenCombos = function() {
                    Settings.setTimeBetweenCombos(self.timeBetweenCombos * 1000);
                }

                self.saveRoundIntermission = function() {
                    Settings.setRoundIntermission(self.roundIntermission * 1000);
                }

                self.saveDisplayType = function() {
                    Settings.setDisplayType(self.displayType);
                }
            }
        ]
    });