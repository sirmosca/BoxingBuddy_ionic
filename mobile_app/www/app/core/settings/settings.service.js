System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Settings;
    return {
        setters: [],
        execute: function () {
            Settings = class Settings {
                constructor($resource, $timeout, $interval, $location) {
                    this.$resource = $resource;
                    this.$timeout = $timeout;
                    this.$interval = $interval;
                    this.$location = $location;
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
                        return $timeout(fn, millis);
                    };
                    this.interval = function (fn, millis, count) {
                        return $interval(fn, millis, count);
                    };
                    this.cancelInterval = function (fn) {
                        $interval.cancel(fn);
                    };
                    this.navigate = function (url) {
                        $location.path(url);
                    };
                    this.roundTime = 180000;
                    this.maxRounds = 2;
                    this.timeBetweenPunches = 750;
                    this.timeBetweenCombos = 1000;
                    this.roundIntermission = 60000;
                    this.displayType = "numbers";
                }
            };
            Settings.$inject = ['$resource', '$timeout', '$interval', '$location'];
            exports_1("Settings", Settings);
        }
    };
});
//# sourceMappingURL=settings.service.js.map