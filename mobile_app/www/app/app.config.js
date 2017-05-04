function Config($routeProvider, $locationProvider) {
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