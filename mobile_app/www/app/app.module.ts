import Combination from './core/combination/combination.service';
import Settings from './core/settings/settings.service';
import Speech from './core/speech/speech.service'; 
import MainViewController from './main-view/main-view.component';
import GlossaryViewController from './glossary-view/glossary-view.component';
import BoxingMatchViewController from './boxing-match-view/boxing-match-view.component';
import SettingsViewController from './settings-view/settings-view.component';
import ComboTeachingViewController from './combo-teaching-view/combo-teaching-view.component';

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
        "settingsView"
    ])
    .config(configure)
    .run(runConfig)
    .animation('.mainBoxingGlove', boxingBuddyAnimationFactory);

angular.module('core.settings', ['ngResource']);
angular.module('core.settings')
   .service('Settings', ['$resource', '$timeout', '$interval', '$location', Settings]);

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

runConfig.$inject = ['$ionicPlatform'];
function runConfig($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
};

configure.$inject = ['$routeProvider', '$locationProvider'];
function configure($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("!");
    $locationProvider.html5Mode(false);

    $routeProvider
        .when("/", {
            template: "<main-view></main-view>",
        })
        .when("/settings", {
            template: "<settings-view></settings-view>",
        })
        .when("/enterRing", {
            template: "<boxing-match-view></boxing-match-view>",
        })
        .when("/combos", {
            template: "<combo-teaching-view></combo-teaching-view>",
        })
        .when("/glossary", {
            template: "<glossary-view></glossary-view>",
        })
        .otherwise("/");
};

function boxingBuddyAnimationFactory() {
    return {
      addClass: animateIn,
      removeClass: animateOut
    };

  function animateIn(element, className, done) {
    element.css({
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 200,
      height: 200,
      width: 100
    }).animate({
      height: 400,
      width: 200,
      top: -100,
      left: 160
    }, 500, done);

    return function animateInEnd(wasCanceled) {
      if (wasCanceled) element.stop();
    };
  };

  function animateOut(element, className, done) {
    element.css({
      display: 'none'
    }).animate({
    }, done);

    return function animateOutEnd(wasCanceled) {
      if (wasCanceled) element.stop();
    };
  } ;
};

angular.element(function() {
    angular.bootstrap(document, ['boxingBuddyApp']);
});