"use strict";

angular.module("mainView").component("mainView", {
    templateUrl: "main-view/main-view.template.html",
    controller: [
        "Settings",
        "Combination",
        function MainViewController(Settings, Combination) {
            var self = this;

            self.enterRing = function() {
                Settings.navigate("/enterRing");
            };

            self.goToSettings = function() {
                Settings.navigate("/settings");
            };

            self.viewGlossary = function() {
                Settings.navigate("/glossary");
            };

            self.practiceCombos = function() {
                Settings.navigate("/combos");
            }
        },
    ],
});
