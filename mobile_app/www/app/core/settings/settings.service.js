System.register(["@angular/core", "@angular/router"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, router_1, Settings;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }
        ],
        execute: function () {
            Settings = class Settings {
                constructor() {
                    this.setRoundTime = function (roundTime) {
                        this.roundTime = roundTime;
                    };
                    this.getRoundTime = function () {
                        return this.roundTime;
                    };
                    this.setMaxRounds = function (maxRounds) {
                        this.maxRounds = maxRounds;
                    };
                    this.getMaxRounds = function () {
                        return this.maxRounds;
                    };
                    this.getTimeBetweenPunches = function () {
                        return this.timeBetweenPunches;
                    };
                    this.setTimeBetweenPunches = function (timeBetweenPunches) {
                        this.timeBetweenPunches = timeBetweenPunches;
                    };
                    this.getTimeBetweenCombos = function () {
                        return this.timeBetweenCombos;
                    };
                    this.setTimeBetweenCombos = function (timeBetweenCombos) {
                        this.timeBetweenCombos = timeBetweenCombos;
                    };
                    this.getRoundIntermission = function () {
                        return this.roundIntermission;
                    };
                    this.setRoundIntermission = function (roundIntermission) {
                        this.roundIntermission = rountIntermission;
                    };
                    this.getDisplayType = function () {
                        return this.displayType;
                    };
                    this.setDisplayType = function (displayType) {
                        this.displayType = displayType;
                    };
                    this.sleep = function (fn, millis) {
                        return setTimeout(fn, millis);
                    };
                    this.interval = function (fn, millis) {
                        let intervalId = setInterval(fn, millis);
                        return intervalId;
                    };
                    this.cancelInterval = function (intervalId) {
                        clearInterval(intervalId);
                    };
                    this.navigate = function (url) {
                        router_1.Router.navigateByUrl(url);
                    };
                    this.roundTime = 180000;
                    this.maxRounds = 2;
                    this.timeBetweenPunches = 750;
                    this.timeBetweenCombos = 1000;
                    this.roundIntermission = 60000;
                    this.displayType = "numbers";
                }
            };
            Settings = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [])
            ], Settings);
            exports_1("Settings", Settings);
        }
    };
});
//# sourceMappingURL=settings.service.js.map