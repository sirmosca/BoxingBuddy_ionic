export class GlossaryViewController {
    
    private combos = [];
    private selectedCombo;

    static $inject = ['Settings', 'Combination'];

    constructor(private Settings, private Combination) {}

    $onInit = function() {
        this.combos = [];
        this.selectedCombo = null;
        var c = [];
        Combination.query().then(function(resp) {
            angular.forEach(resp, (v,k) => c.push(v), {});
        });
        this.combos = c;
    }

    formatPunches = function() {
        if (this.selectedCombo === null) return;

        var combo = this.selectedCombo;
        var output = "";
        for (var i=0; i < combo.punchNames.length; i++) {
            output += combo.punchNames[i] + " (" + combo.punchNumbers[i] + "), ";
        }
        return output;
    };

    getName = function() {
        return this.selectedCombo === null ? "" : this.selectedCombo.name;
    };

    selectCombo = function(combo) {
        this.selectedCombo = combo;
    }
}