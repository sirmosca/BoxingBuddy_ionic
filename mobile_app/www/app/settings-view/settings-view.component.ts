export class SettingsViewController {

    private roundTime: number;
    private maxRounds: number;
    private timeBetweenPunches: number;
    private roundIntermission: number;
    private displaytype: string;
    private timeBetweenCombos: number;
    
    static $inject = ['Settings'];

    constructor(private Settings) {
        this.roundTime = Settings.getRoundTime() / 1000;
        this.maxRounds = Settings.getMaxRounds();
        this.timeBetweenPunches = Settings.getTimeBetweenPunches() / 1000;
        this.roundIntermission = Settings.getRoundIntermission() / 1000;
        this.displayType = Settings.getDisplayType();
        this.timeBetweenCombos = Settings.getTimeBetweenCombos() / 1000;
    }

    saveRoundTime = function() {
        Settings.setRoundTime(this.roundTime * 1000);
    }

    saveMaxRounds = function() {
        Settings.setMaxRounds(this.maxRounds);
    }

    saveTimeBetweenPunches = function() {
        Settings.setTimeBetweenPunches(this.timeBetweenPunches * 1000);
    }

    saveTimeBetweenCombos = function() {
        Settings.setTimeBetweenCombos(this.timeBetweenCombos * 1000);
    }

    saveRoundIntermission = function() {
        Settings.setRoundIntermission(this.roundIntermission * 1000);
    }

    saveDisplayType = function() {
        Settings.setDisplayType(this.displayType);
    }
}