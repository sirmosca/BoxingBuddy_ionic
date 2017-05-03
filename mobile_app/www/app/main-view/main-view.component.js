function MainViewController(Settings) {
    var self = this;

    self.enterRing = function() {
        Settings.navigate("/enterRing");
    };

    self.goToSettings = function() {
        Settings.navigate("/settings");
    };

    self.viewGlossary = function() {
        Settings.navigate("/glossary");
    };

    self.practiceCombos = function() {
        Settings.navigate("/combos");
    }
}