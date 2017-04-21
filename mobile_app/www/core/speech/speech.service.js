'use strict';

/**
 * @type Factory
 * @module speech.factory
 * @class speech
 */
angular
    .module('core.speech')
    .factory('Speech', function () {
        function sayIt(text, config) {
            
            TTS.speak({
                text: text,
                locale: 'en-US',
                rate: 1.5
            }, function () {
                console.log("we talked");
            }, function (reason) {
                console.log("shit");
                console.log(reason);
            });
        }

        return {
            sayText: sayIt
        };
    });