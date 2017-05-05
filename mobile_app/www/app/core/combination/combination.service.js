System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Combination;
    return {
        setters: [],
        execute: function () {
            Combination = class Combination {
                constructor($resource) {
                    this.$resource = $resource;
                    this.query = function () {
                        let combos = [];
                        const allCombinations = this.$resource('dist/:combinationId.json', {}, {
                            q: {
                                method: 'GET',
                                params: { combinationId: 'combinations' },
                                isArray: true
                            }
                        }).q().$promise;
                        return allCombinations;
                    };
                }
            };
            Combination.$inject = ['$resource'];
            exports_1("Combination", Combination);
        }
    };
});
//# sourceMappingURL=combination.service.js.map