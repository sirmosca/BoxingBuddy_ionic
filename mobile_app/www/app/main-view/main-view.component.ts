export class MainViewController {

    static $inject = ['Settings'];
    
    constructor(private Settings) {}

    enterRing = function() {
        this.Settings.navigate("enterRing");
    };

    goToSettings = function() {
        this.Settings.navigate("/settings");
    };

    viewGlossary = function() {
        this.Settings.navigate("glossary");
    };

    practiceCombos = function() {
        this.Settings.navigate("/combos");
    }
}