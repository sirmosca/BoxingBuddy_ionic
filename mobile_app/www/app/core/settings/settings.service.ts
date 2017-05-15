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

    constructor() {
            this.roundTime = 180000;
            this.maxRounds = 2;
            this.timeBetweenPunches = 750;
            this.timeBetweenCombos = 1000;
            this.roundIntermission = 60000;
            this.displayType = "numbers";
    }
    
    setRoundTime = function(roundTime) {
        this.roundTime = roundTime;
    };

    getRoundTime = function() {
        return this.roundTime;
    };

    setMaxRounds = function(maxRounds) {
        this.maxRounds = maxRounds;
    }

    getMaxRounds = function() {
        return this.maxRounds;
    }

    getTimeBetweenPunches = function() {
        return this.timeBetweenPunches;
    }

    setTimeBetweenPunches = function(timeBetweenPunches) {
        this.timeBetweenPunches = timeBetweenPunches
    }

    getTimeBetweenCombos = function() {
        return this.timeBetweenCombos;
    }

    setTimeBetweenCombos = function(timeBetweenCombos) {
        this.timeBetweenCombos = timeBetweenCombos;
    }

    getRoundIntermission = function() {
        return this.roundIntermission;
    }

    setRoundIntermission = function(roundIntermission) {
        this.roundIntermission = rountIntermission;
    }

    getDisplayType = function() {
        return this.displayType;
    }

    setDisplayType = function(displayType) {
        this.displayType = displayType;
    }

    sleep = function(fn, millis) {
        return setTimeout(fn, millis);
    };

    interval = function(fn, millis) {
        let intervalId = setInterval(fn, millis);
        return intervalId;
    }

    cancelInterval = function(intervalId) {
        clearInterval(intervalId);
    }

    navigate = function(url) {
        Router.navigateByUrl(url);
    }
}