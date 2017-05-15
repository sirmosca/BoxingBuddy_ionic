System.register(["./core/combination/combination.service", "@angular/core", "@angular/platform-browser", "@angular/http", "@angular/upgrade/static", "@angular/platform-browser-dynamic", "./core/settings/settings.service", "./core/speech/speech.service", "./main-view/main-view.component", "./glossary-view/glossary-view.component", "./boxing-match-view/boxing-match-view.component", "./settings-view/settings-view.component", "./combo-teaching-view/combo-teaching-view.component", "./app.config", "./app.run", "./app.animations", "@angular/router"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var combination_service_1, core_1, platform_browser_1, http_1, static_1, platform_browser_dynamic_1, settings_service_1, speech_service_1, main_view_component_1, glossary_view_component_1, boxing_match_view_component_1, settings_view_component_1, combo_teaching_view_component_1, app_config_1, app_run_1, app_animations_1, router_1, AppModule;
    return {
        setters: [
            function (combination_service_1_1) {
                combination_service_1 = combination_service_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (static_1_1) {
                static_1 = static_1_1;
            },
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
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
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }
        ],
        execute: function () {
            AppModule = class AppModule {
                ngDoBootstrap() { }
            };
            AppModule = __decorate([
                core_1.NgModule({
                    providers: [settings_service_1.Settings],
                    imports: [
                        platform_browser_1.BrowserModule,
                        static_1.UpgradeModule,
                        http_1.HttpModule,
                        router_1.RouterModule
                    ],
                    bootstrap: []
                })
            ], AppModule);
            exports_1("AppModule", AppModule);
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
            angular.module('core.settings', []);
            angular.module('core.settings')
                .factory('Settings', [settings_service_1.Settings]);
            angular.module('core.combination', ['ngResource']);
            angular.module('core.combination')
                .service('Combination', ['$resource', combination_service_1.Combination]);
            angular.module('core.speech', []);
            angular.module('core.speech')
                .service('Speech', [speech_service_1.default]);
            angular.module('core', ['core.settings', 'core.combination', 'core.speech']);
            angular.module('mainView', ['core']);
            angular.module('mainView').component('mainView', {
                templateUrl: "app/main-view/main-view.template.html",
                controller: ['Settings', main_view_component_1.MainViewController]
            });
            angular.module("glossaryView", ["core"]);
            angular.module("glossaryView").component("glossaryView", {
                templateUrl: "app/glossary-view/glossary-view.template.html",
                controller: ["Settings", "Combination", glossary_view_component_1.GlossaryViewController]
            });
            angular.module("boxingMatchView", ["core"]);
            angular.module("boxingMatchView").component("boxingMatchView", {
                templateUrl: "app/boxing-match-view/boxing-match-view.template.html",
                controller: ["Settings", "Combination", "Speech", boxing_match_view_component_1.BoxingMatchViewController]
            });
            angular.module('settingsView', ['core']);
            angular.module('settingsView').component('settingsView', {
                templateUrl: 'app/settings-view/settings-view.template.html',
                controller: ['Settings', settings_view_component_1.SettingsViewController]
            });
            angular.module('comboTeachingView', ['core']);
            angular.module('comboTeachingView').component('comboTeachingView', {
                templateUrl: 'app/combo-teaching-view/combo-teaching-view.template.html',
                controller: ['Settings', 'Combination', 'Speech', combo_teaching_view_component_1.ComboTeachingViewController]
            });
            platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
                const upgrade = platformRef.injector.get(static_1.UpgradeModule);
                upgrade.bootstrap(document.body, ['boxingBuddyApp'], { strictDi: true });
            });
        }
    };
});
//# sourceMappingURL=app.module.js.map