export class ComboTeachingViewController {

    private combons: Array = [];

    static $inject = ['Settings', 'Combination', 'Speech'];

    constructor(Settings, Combination, Speech) {}

    $onInit = function() {
        this.combos = [];
        this.selectedCombo = null;
        var c = [];
        Combination.query().then(function(resp) {
            angular.forEach(resp, (v,k) => c.push(v), {});
        });
        this.combos = c;
    }
}