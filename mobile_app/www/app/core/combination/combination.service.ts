export class Combination {

  static $inject = ['$resource'];

  constructor(private $resource: any) {}

  query = function() {
    let combos = [];
    const allCombinations = this.$resource('dist/:combinationId.json', {}, {
      q: {
        method: 'GET',
        params: {combinationId: 'combinations'},
        isArray: true
      }
    }).q().$promise;

    return allCombinations;
  }
}