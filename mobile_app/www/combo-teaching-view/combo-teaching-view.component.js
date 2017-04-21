'use strict';

angular
    .module('comboTeachingView')
    .component('comboTeachingView', {
        templateUrl: 'combo-teaching-view/combo-teaching-view.template.html',
        controller: ['Settings', 'Combination', 'Speech', 
            function ComboTeachingViewController(Settings, Combination, Speech) {
                var self = this;
                self.combos = [];
                Combination.query().$promise.then(function (resp) {
                    angular.forEach(resp, function(value, key) {
                        if (value.isExtendedCombo) {
                            this.push(value);
                        }
                    }, self.combos);
                });
            }
        ]
    });