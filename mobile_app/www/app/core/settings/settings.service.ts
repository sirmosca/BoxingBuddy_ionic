import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class Settings {

    private roundTime: number;
    private maxRounds: number;
    private timeBetweenPunches: number;
    private timeBetweenCombos: number;
    private roundIntermission: number;
    private displayType: string;

    constructor(
//        private router:Router
    ) {
            this.roundTime = 180000;
            this.maxRounds = 2;
            this.timeBetweenPunches = 750;
            this.timeBetweenCombos = 1000;
            this.roundIntermission = 60000;
            this.displayType = "numbers";
    }
    
    setRoundTime(roundTime) {
        this.roundTime = roundTime;
    };

    getRoundTime() {
        return this.roundTime;
    };

    setMaxRounds(maxRounds) {
        this.maxRounds = maxRounds;
    }

    getMaxRounds() {
        return this.maxRounds;
    }

    getTimeBetweenPunches() {
        return this.timeBetweenPunches;
    }

    setTimeBetweenPunches(timeBetweenPunches) {
        this.timeBetweenPunches = timeBetweenPunches
    }

    getTimeBetweenCombos() {
        return this.timeBetweenCombos;
    }

    setTimeBetweenCombos(timeBetweenCombos) {
        this.timeBetweenCombos = timeBetweenCombos;
    }

    getRoundIntermission() {
        return this.roundIntermission;
    }

    setRoundIntermission(roundIntermission) {
        this.roundIntermission = roundIntermission;
    }

    getDisplayType() {
        return this.displayType;
    }

    setDisplayType(displayType) {
        this.displayType = displayType;
    }

    sleep(fn, millis) {
        setTimeout(fn, millis);
    };

    interval(fn, millis, count) {
        let id = setInterval(fn, millis);
        return id;
    }

    cancelInterval(id) {
        clearInterval(id);
    }

    navigate(url) {
 //       this.router.navigate([url]);
    }
}