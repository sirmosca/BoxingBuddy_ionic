"use strict";

angular.module("glossaryView").component("glossaryView", {
    templateUrl: "glossary-view/glossary-view.template.html",
    controller: [
        "Settings",
        "Combination",
        function GlossaryController(Settings, Combination) {
            var self = this;
            self.combos = [];
            self.selectedCombo = null;

            Combination.query().$promise.then(function(resp) {
                angular.forEach(
                    resp,
                    function(value, key) {
                        this.push(value);
                    },
                    self.combos
                );
            });

            self.formatPunches = function() {
                if (self.selectedCombo === null) return;

                var combo = self.selectedCombo;
                var output = "";
                for (var i=0; i < combo.punchNames.length; i++) {
                    output += combo.punchNames[i] + " (" + combo.punchNumbers[i] + "), ";
                }
                return output;
            };

            self.getName = function() {
                return self.selectedCombo === null ? "" : self.selectedCombo.name;
            };

            self.selectCombo = function(combo) {
                self.selectedCombo = combo;
            }
        },
    ],
});
