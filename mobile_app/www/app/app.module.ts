import { AppComponent }     from './app.component';
import {Combination} from './core/combination/combination.service';
import { NgModule, Injectable, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { UpgradeModule, downgradeInjectable } from '@angular/upgrade/static';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouterModule, UrlHandlingStrategy, UrlTree, Router, Routes } from '@angular/router';
import { Settings } from './core/settings/settings.service';
import Speech from './core/speech/speech.service'; 
import {MainViewController} from './main-view/main-view.component';
import {GlossaryViewController} from './glossary-view/glossary-view.component';
import {BoxingMatchViewController} from './boxing-match-view/boxing-match-view.component';
import {SettingsViewController} from './settings-view/settings-view.component';
import {ComboTeachingViewController} from './combo-teaching-view/combo-teaching-view.component';
import Config from './app.config';
import RunConfig from './app.run';
import MainGloveAnimation from './app.animations';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';

export class Ng1Ng2UrlHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url: UrlTree) {
    return url.toString() === '/';
  }
  extract(url: UrlTree) { return url; }
  merge(url: UrlTree, whole: UrlTree) { return url; }
}

declare var angular: angular.IAngularStatic;
const appRoutes: Routes = [
    // {path: 'settings', component: SettingsViewController},
    // {path: 'enterRing', component: BoxingMatchViewController},
    // {path: 'combos', component: ComboTeachingViewController},
    // {path: 'glossary', component: GlossaryViewController},
    {path: '', component: MainViewController},
];

@NgModule({
    providers: [ 
        Settings, 
        { provide: APP_BASE_HREF, useValue: '!' },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: UrlHandlingStrategy, useClass: Ng1Ng2UrlHandlingStrategy }
    ],
    exports: [RouterModule],
    imports: [
        BrowserModule,
        UpgradeModule,
        RouterModule.forRoot(appRoutes)
    ],
    entryComponents: [
        // MainViewController,
        // SettingsViewController,
        // BoxingMatchViewController,
        // ComboTeachingViewController,
        // GlossaryViewController
    ],
    declarations: [
        //AppComponent
    ],
    bootstrap: [  ]
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
    .service('Settings', downgradeInjectable(Settings));

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