function BoxingMatchViewController(Settings, Combination, Speech) {
    var self = this;

    self.$onInit = function() {
        self.startedBoxing = false;
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

    };

    self.$onDestroy = function() {
        self.stopPunching();
    };

    self.startBoxing = function() {
        self.startedBoxing = true;
        const roundTime = Settings.getRoundTime();
        const maxRounds = Settings.getMaxRounds();
        const roundIntermission = Settings.getRoundIntermission();
        const timeBetweenPunches = Settings.getTimeBetweenPunches();
        const timeBetweenCombos = Settings.getTimeBetweenCombos();

        self.startCountdown().then(() => {
            var round = 1;

            self.boxARound(roundTime, timeBetweenPunches, roundIntermission, maxRounds, round);
        });
    };

    self.boxARound = function(roundTime, timeBetweenPunches, roundIntermission, maxRounds, currentRound) {
        var totalTime = 0;
        var combos = [];

        while (totalTime < roundTime) {
            var comboIndex = self.getRandomComboIndex();
            var combo = self.combos[comboIndex];
            var comboName = combo.name;
            var comboTime = combo.punchNumbers.length * timeBetweenPunches;
            combos.push({name: comboName, time: comboTime});
            totalTime += comboTime;
        }

        self.throwCombos(combos);
        Settings.sleep(() => {}, roundTime)
            .then(() => {
                return self.roundIntermission(roundIntermission);
            })
            .then(() => {
                if (currentRound === maxRounds || self.startedBoxing === false) {
                    self.stopPunching();
                    self.changeDisplay("Fight's Over");
                    self.startedBoxing = false;
                } else {
                    return self.boxARound(
                        roundTime, timeBetweenPunches, roundIntermission, maxRounds, currentRound+1
                    );
                }
            });
    };

    self.throwCombos = function(combos) {
        if (self.stopPunching === false) return;
        if (combos == undefined || combos.length == 0) return;

        const combo = combos[0];
        self.changeDisplay(combo.name);
        return Settings.sleep(() => {
            self.throwCombos(combos.slice(1));
        }, combo.time);
    }

    self.roundIntermission = function(roundIntermission) {
        self.changeDisplay("intermission");
        return Settings.sleep(() => {}, roundIntermission);
    };

    self.getRandomComboIndex = function() {
        var min = 0;
        var max = Math.floor(self.combos.length - 1);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    self.stopBoxing = function() {
        self.startedBoxing = false;
        self.changeDisplay("Fight Stopped");
    };

    self.stopPunching = function() {
        return new Promise(
            () => {
                self.stopBoxing();
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
}