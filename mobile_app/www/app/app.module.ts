import {Combination} from './core/combination/combination.service';

import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
declare var angular: angular.IAngularStatic;
import { UpgradeModule, downgradeInjectable } from '@angular/upgrade/static';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {Settings} from './core/settings/settings.service';
import Speech from './core/speech/speech.service'; 
import {MainViewController} from './main-view/main-view.component';
import {GlossaryViewController} from './glossary-view/glossary-view.component';
import {BoxingMatchViewController} from './boxing-match-view/boxing-match-view.component';
import {SettingsViewController} from './settings-view/settings-view.component';
import {ComboTeachingViewController} from './combo-teaching-view/combo-teaching-view.component';
import Config from './app.config';
import RunConfig from './app.run';
import MainGloveAnimation from './app.animations';
import { RouterModule, UrlHandlingStrategy, UrlTree,Router } from '@angular/router';

@NgModule({
    providers: [Settings],
    imports: [
        BrowserModule,
        UpgradeModule,
        HttpModule,
        RouterModule
    ],
    bootstrap: []
})
export class AppModule {
  ngDoBootstrap() {}
}

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
    .config(['$routeProvider', '$locationProvider', Config])
    .run(['$ionicPlatform', RunConfig])
    .animation('.mainBoxingGlove', MainGloveAnimation);

angular.module('core.settings', []);
angular.module('core.settings')
   .factory('Settings', [Settings]);

angular.module('core.combination', ['ngResource']);
angular.module('core.combination')
    .service('Combination', ['$resource', Combination]);

angular.module('core.speech', []);
angular.module('core.speech')
    .service('Speech', [Speech]);

angular.module('core', ['core.settings', 'core.combination', 'core.speech']);

angular.module('mainView', ['core']);
angular.module('mainView').component('mainView', {
    templateUrl: "app/main-view/main-view.template.html",
    controller: ['Settings', MainViewController]
});

angular.module("glossaryView", ["core"]);
angular.module("glossaryView").component("glossaryView", {
    templateUrl: "app/glossary-view/glossary-view.template.html",
    controller: ["Settings", "Combination", GlossaryViewController]
});

angular.module("boxingMatchView", ["core"]);
angular.module("boxingMatchView").component("boxingMatchView", {
    templateUrl: "app/boxing-match-view/boxing-match-view.template.html",
    controller: ["Settings", "Combination", "Speech", BoxingMatchViewController]
});

angular.module('settingsView', ['core']);
angular.module('settingsView').component('settingsView', {
    templateUrl: 'app/settings-view/settings-view.template.html',
    controller: ['Settings', SettingsViewController]
});

angular.module('comboTeachingView', ['core']);
angular.module('comboTeachingView').component('comboTeachingView', {
    templateUrl: 'app/combo-teaching-view/combo-teaching-view.template.html',
    controller: ['Settings', 'Combination', 'Speech', ComboTeachingViewController]
});

platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
  const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
  upgrade.bootstrap(document.body, ['boxingBuddyApp'], { strictDi: true });
});