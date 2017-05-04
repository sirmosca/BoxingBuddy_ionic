import Combination from './core/combination/combination.service';
import {Settings} from './core/settings/settings.service';
import Speech from './core/speech/speech.service'; 
import MainViewController from './main-view/main-view.component';
import GlossaryViewController from './glossary-view/glossary-view.component';
import BoxingMatchViewController from './boxing-match-view/boxing-match-view.component';
import SettingsViewController from './settings-view/settings-view.component';
import ComboTeachingViewController from './combo-teaching-view/combo-teaching-view.component';
import Config from './app.config';
import RunConfig from './app.run';
import MainGloveAnimation from './app.animations';

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

angular.module('core.settings', ['ngResource']);
angular.module('core.settings')
   .factory('Settings', ['$resource', '$timeout', '$interval', '$location', Settings]);

angular.module('core.combination', ['ngResource']);
angular.module('core.combination')
    .factory('Combination', ['$resource', Combination]);

angular.module('core.speech', []);
angular.module('core.speech')
    .factory('Speech', [Speech]);

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

angular.element(function() {
    angular.bootstrap(document, ['boxingBuddyApp']);
});