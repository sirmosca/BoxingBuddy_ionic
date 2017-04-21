"use strict";

angular.module("boxingMatchView").component("boxingMatchView", {
    templateUrl: "boxing-match-view/boxing-match-view.template.html",
    controller: [
        "Settings",
        "Combination",
        "Speech",
        function BoxingMatchViewController(Settings, Combination, Speech) {
            var self = this;
            var punching;

            // move this into an init function then call it
            self.startedBoxing = false;
            self.pauseBoxing = false;
            self.showPunchImg = false;
            self.combos = [];
            Combination.query().$promise.then(function(resp) {
                angular.forEach(
                    resp,
                    function(value, key) {
                        if (!value.isExtendedCombo) {
                            this.push(value);
                        }
                    },
                    self.combos
                );
            });

            self.$onDestroy = function() {
                self.stopPunching();
            };

            self.startBoxing = function() {
                self.startedBoxing = true;
                var roundTime = Settings.getRoundTime();
                var maxRounds = Settings.getMaxRounds();
                var roundIntermission = Settings.getRoundIntermission();
                var timeBetweenPunches = Settings.getTimeBetweenPunches();
                var timeBetweenCombos = Settings.getTimeBetweenCombos();

                self.startCountdown().then(() => {
                    var round = 1;

                    self.executeRound(
                        round,
                        roundTime,
                        maxRounds,
                        roundIntermission,
                        timeBetweenPunches,
                        timeBetweenCombos
                    );
                });
            };

            self.executeRound = function(
                currentRound,
                roundTime,
                maxRounds,
                roundIntermission,
                timeBetweenPunches,
                timeBetweenCombos
            ) {
                self.pauseBoxing = false;
                self.doPunches(timeBetweenPunches, timeBetweenCombos);
                return Settings.sleep(
                    () => {
                        self.stopPunching();
                    },
                    roundTime
                )
                    .then(() => {
                        return self.roundIntermission(roundIntermission);
                    })
                    .then(() => {
                        if (
                            currentRound === maxRounds ||
                            self.startedBoxing === false
                        ) {
                            self.stopPunching();
                            self.changeDisplay("Fight's Over");
                            self.startedBoxing = false;
                        } else {
                            return self.executeRound(
                                currentRound + 1,
                                roundTime,
                                maxRounds,
                                roundIntermission,
                                timeBetweenPunches,
                                timeBetweenCombos
                            );
                        }
                    });
            };

            self.doPunches = function(timeBetweenPunches, timeBetweenCombos) {
                if (self.pauseBoxing) return;
                if (self.startedBoxing === false) return;

                self
                    .throwCombo(timeBetweenPunches, timeBetweenCombos)
                    .then(() => {
                        Settings.sleep(
                            () => {
                                self.doPunches(
                                    timeBetweenPunches,
                                    timeBetweenCombos
                                );
                            },
                            timeBetweenCombos
                        );
                    });
            };

            self.throwCombo = function(timeBetweenPunches, timeBetweenCombos) {
                var punchIndex = 0;
                var comboIndex = self.getRandomComboIndex();
                const combo = self.combos[comboIndex].name;
                const interval = self.combos[comboIndex].punchNumbers.length *
                    timeBetweenPunches;
                self.changeDisplay(combo);
                punching = Settings.sleep(() => {}, interval);

                return punching;
            };

            self.roundIntermission = function(roundIntermission) {
                self.changeDisplay("intermission");
                self.pauseBoxing = true;
                return Settings.sleep(() => {}, roundIntermission);
            };

            self.getRandomComboIndex = function() {
                var min = 0;
                var max = Math.floor(self.combos.length - 1);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };

            self.stopBoxing = function() {
                self.startedBoxing = false;
                self.stopPunching();
                punching = null;
                self.changeDisplay("Fight Stopped");
            };

            self.stopPunching = function() {
                return new Promise(
                    () => {
                        self.pauseBoxing = true;
                    },
                    () => {}
                );
            };

            self.startCountdown = function() {
                var start = () => self.changeDisplay(3);
                var two = () => self.changeDisplay(2);
                var one = () => self.changeDisplay(1);
                var showPunchImg = () => self.showPunchImg = true;
                var hidePunchImg = () => self.showPunchImg = false;

                return Settings.sleep(start, 0)
                    .then(() => {
                        return Settings.sleep(two, 1000);
                    })
                    .then(() => {
                        return Settings.sleep(one, 1000);
                    })
                    .then(() => {
                        return Settings.sleep(
                            () => {
                                showPunchImg();
                                Speech.sayText("Fight");
                                self.changeDisplay("");
                            },
                            1000
                        );
                    })
                    .then(() => {
                        return Settings.sleep(hidePunchImg, 0);
                    })
                    .then(() => {
                        return Settings.sleep(() => {}, 250);
                    });
            };

            self.changeDisplay = function(display) {
                if (display) {
                    Speech.sayText(display);
                }

                self.display = display;
            };
        },
    ],
});
