function ComboTeachingViewController(Settings, Combination, Speech) {
    var self = this;
    self.combos = [];
    Combination.query().$promise.then(function (resp) {
        angular.forEach(resp, function(value, key) {
            if (value.isExtendedCombo) {
                this.push(value);
            }
        }, self.combos);
    });
}