'use strict'

angular
    .module('core.combination')
    .factory('Combination', ['$resource',
        function($resource) {
          return $resource('combinations/:combinationId.json', {}, {
            query: {
              method: 'GET',
              params: {combinationId: 'combinations'},
              isArray: true
            }
          });
        }
    ]);