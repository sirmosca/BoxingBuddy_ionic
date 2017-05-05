System.register(["./core/combination/combination.service", "./core/settings/settings.service", "./core/speech/speech.service", "./main-view/main-view.component", "./glossary-view/glossary-view.component", "./boxing-match-view/boxing-match-view.component", "./settings-view/settings-view.component", "./combo-teaching-view/combo-teaching-view.component", "./app.config", "./app.run", "./app.animations"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var combination_service_1, settings_service_1, speech_service_1, main_view_component_1, glossary_view_component_1, boxing_match_view_component_1, settings_view_component_1, combo_teaching_view_component_1, app_config_1, app_run_1, app_animations_1;
    return {
        setters: [
            function (combination_service_1_1) {
                combination_service_1 = combination_service_1_1;
            },
            function (settings_service_1_1) {
                settings_service_1 = settings_service_1_1;
            },
            function (speech_service_1_1) {
                speech_service_1 = speech_service_1_1;
            },
            function (main_view_component_1_1) {
                main_view_component_1 = main_view_component_1_1;
            },
            function (glossary_view_component_1_1) {
                glossary_view_component_1 = glossary_view_component_1_1;
            },
            function (boxing_match_view_component_1_1) {
                boxing_match_view_component_1 = boxing_match_view_component_1_1;
            },
            function (settings_view_component_1_1) {
                settings_view_component_1 = settings_view_component_1_1;
            },
            function (combo_teaching_view_component_1_1) {
                combo_teaching_view_component_1 = combo_teaching_view_component_1_1;
            },
            function (app_config_1_1) {
                app_config_1 = app_config_1_1;
            },
            function (app_run_1_1) {
                app_run_1 = app_run_1_1;
            },
            function (app_animations_1_1) {
                app_animations_1 = app_animations_1_1;
            }
        ],
        execute: function () {
            angular
                .module("boxingBuddyApp", [
                "ngAnimate",
                "ngRoute",
                "ngResource",
                "ionic",
                "core",
                "mainView",
                "glossaryView",
                "boxingMatchView",
                "settingsView",
                "comboTeachingView"
            ])
                .config(['$routeProvider', '$locationProvider', app_config_1.default])
                .run(['$ionicPlatform', app_run_1.default])
                .animation('.mainBoxingGlove', app_animations_1.default);
            angular.module('core.settings', ['ngResource']);
            angular.module('core.settings')
                .factory('Settings', ['$resource', '$timeout', '$interval', '$location', settings_service_1.Settings]);
            angular.module('core.combination', ['ngResource']);
            angular.module('core.combination')
                .factory('Combination', ['$resource', combination_service_1.Combination]);
            angular.module('core.speech', []);
            angular.module('core.speech')
                .factory('Speech', [speech_service_1.default]);
            angular.module('core', ['core.settings', 'core.combination', 'core.speech']);
            angular.module('mainView', ['core']);
            angular.module('mainView').component('mainView', {
                templateUrl: "app/main-view/main-view.template.html",
                controller: ['Settings', main_view_component_1.default]
            });
            angular.module("glossaryView", ["core"]);
            angular.module("glossaryView").component("glossaryView", {
                templateUrl: "app/glossary-view/glossary-view.template.html",
                controller: ["Settings", "Combination", glossary_view_component_1.default]
            });
            angular.module("boxingMatchView", ["core"]);
            angular.module("boxingMatchView").component("boxingMatchView", {
                templateUrl: "app/boxing-match-view/boxing-match-view.template.html",
                controller: ["Settings", "Combination", "Speech", boxing_match_view_component_1.default]
            });
            angular.module('settingsView', ['core']);
            angular.module('settingsView').component('settingsView', {
                templateUrl: 'app/settings-view/settings-view.template.html',
                controller: ['Settings', settings_view_component_1.default]
            });
            angular.module('comboTeachingView', ['core']);
            angular.module('comboTeachingView').component('comboTeachingView', {
                templateUrl: 'app/combo-teaching-view/combo-teaching-view.template.html',
                controller: ['Settings', 'Combination', 'Speech', combo_teaching_view_component_1.default]
            });
            angular.element(function () {
                angular.bootstrap(document, ['boxingBuddyApp']);
            });
        }
    };
});
//# sourceMappingURL=app.module.js.map