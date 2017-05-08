export class BoxingMatchViewController {

    private startedBoxing: boolean;
    private showPunchImg: boolean;
    private combos: Array;

    static $inject = ['Settings', 'Combination', 'Speech'];

    constructor(Settings, Combination, Speech) {}

    $onInit = function() {
        this.startedBoxing = false;
        this.showPunchImg = false;
        this.combos = [];
        var c = [];

        Combination.query().then(function(resp) {
            angular.forEach(resp, (v,k) => {
                if (!v.isExtendedCombo) {
                    c.push(v);
                }
            }, {});
        });

        this.combos = c;
    };

    $onDestroy = function() {
        this.stopPunching();
    };

    startBoxing = function() {
        this.startedBoxing = true;
        const roundTime = Settings.getRoundTime();
        const maxRounds = Settings.getMaxRounds();
        const roundIntermission = Settings.getRoundIntermission();
        const timeBetweenPunches = Settings.getTimeBetweenPunches();
        const timeBetweenCombos = Settings.getTimeBetweenCombos();

        this.startCountdown().then(() => {
            var round = 1;

            this.boxARound(roundTime, timeBetweenPunches, roundIntermission, maxRounds, round);
        });
    };

    boxARound = function(roundTime, timeBetweenPunches, roundIntermission, maxRounds, currentRound) {
        var totalTime = 0;
        var combos = [];

        while (totalTime < roundTime) {
            var comboIndex = this.getRandomComboIndex();
            var combo = this.combos[comboIndex];
            var comboName = combo.name;
            var comboTime = combo.punchNumbers.length * timeBetweenPunches;
            combos.push({name: comboName, time: comboTime});
            totalTime += comboTime;
        }

        this.throwCombos(combos);
        Settings.sleep(() => {}, roundTime)
            .then(() => {
                return this.roundIntermission(roundIntermission);
            })
            .then(() => {
                if (currentRound === maxRounds || this.startedBoxing === false) {
                    this.stopPunching();
                    this.changeDisplay("Fight's Over");
                    this.startedBoxing = false;
                } else {
                    return this.boxARound(
                        roundTime, timeBetweenPunches, roundIntermission, maxRounds, currentRound+1
                    );
                }
            });
    };

    throwCombos = function(combos) {
        if (this.stopPunching === false) return;
        if (combos == undefined || combos.length == 0) return;

        const combo = combos[0];
        this.changeDisplay(combo.name);
        return Settings.sleep(() => {
            this.throwCombos(combos.slice(1));
        }, combo.time);
    }

    roundIntermission = function(roundIntermission) {
        this.changeDisplay("intermission");
        return Settings.sleep(() => {}, roundIntermission);
    };

    getRandomComboIndex = function() {
        var min = 0;
        var max = Math.floor(this.combos.length - 1);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    stopBoxing = function() {
        this.startedBoxing = false;
        this.changeDisplay("Fight Stopped");
    };

    stopPunching = function() {
        return new Promise(
            () => {
                this.stopBoxing();
            },
            () => {}
        );
    };

    startCountdown = function() {
        var start = () => this.changeDisplay(3);
        var two = () => this.changeDisplay(2);
        var one = () => this.changeDisplay(1);
        var showPunchImg = () => this.showPunchImg = true;
        var hidePunchImg = () => this.showPunchImg = false;

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
                        this.changeDisplay("");
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

    changeDisplay = function(display) {
        if (display) {
            Speech.sayText(display);
        }

        this.display = display;
    };
}