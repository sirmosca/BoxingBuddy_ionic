'use strict'

angular
    .module('core.settings')
    .factory('Settings', ['$resource', '$timeout', '$interval', '$location',
        function($resource, $timeout, $interval, $location) {
            var service = {};
            service.roundTime = 180000;
            service.maxRounds = 2;
            service.timeBetweenPunches = 750;
            service.timeBetweenCombos = 1000;
            service.roundIntermission = 60000;
            service.displayType = "numbers";

            service.setRoundTime = function(roundTime) {
                service.roundTime = roundTime;
            };

            service.getRoundTime = function() {
                return service.roundTime;
            };

            service.setMaxRounds = function(maxRounds) {
                service.maxRounds = maxRounds;
            }

            service.getMaxRounds = function() {
                return service.maxRounds;
            }

            service.getTimeBetweenPunches = function() {
                return service.timeBetweenPunches;
            }

            service.setTimeBetweenPunches = function(timeBetweenPunches) {
                service.timeBetweenPunches = timeBetweenPunches
            }

            service.getTimeBetweenCombos = function() {
                return service.timeBetweenCombos;
            }

            service.setTimeBetweenCombos = function(timeBetweenCombos) {
                service.timeBetweenCombos = timeBetweenCombos;
            }

            service.getRoundIntermission = function() {
                return service.roundIntermission;
            }

            service.setRoundIntermission = function(roundIntermission) {
                service.roundIntermission = rountIntermission;
            }

            service.getDisplayType = function() {
                return service.displayType;
            }

            service.setDisplayType = function(displayType) {
                service.displayType = displayType;
            }

            service.sleep = function(fn, millis) {
                return $timeout(fn, millis);
            };

            service.interval = function(fn, millis, count) {
                return $interval(fn, millis, count);
            }

            service.cancelInterval = function(fn) {
                $interval.cancel(fn);
            }

            service.navigate = function(url) {
                $location.path(url);
            }

            return service;
        }
    ]);