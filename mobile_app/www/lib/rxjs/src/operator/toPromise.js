System.register(["../util/root"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /* tslint:enable:max-line-length */
    /**
     * Converts an Observable sequence to a ES2015 compliant promise.
     *
     * @example
     * // Using normal ES2015
     * let source = Rx.Observable
     *   .of(42)
     *   .toPromise();
     *
     * source.then((value) => console.log('Value: %s', value));
     * // => Value: 42
     *
     * // Rejected Promise
     * // Using normal ES2015
     * let source = Rx.Observable
     *   .throw(new Error('woops'))
     *   .toPromise();
     *
     * source
     *   .then((value) => console.log('Value: %s', value))
     *   .catch((err) => console.log('Error: %s', err));
     * // => Error: Error: woops
     *
     * // Setting via the config
     * Rx.config.Promise = RSVP.Promise;
     *
     * let source = Rx.Observable
     *   .of(42)
     *   .toPromise();
     *
     * source.then((value) => console.log('Value: %s', value));
     * // => Value: 42
     *
     * // Setting via the method
     * let source = Rx.Observable
     *   .of(42)
     *   .toPromise(RSVP.Promise);
     *
     * source.then((value) => console.log('Value: %s', value));
     * // => Value: 42
     *
     * @param PromiseCtor promise The constructor of the promise. If not provided,
     * it will look for a constructor first in Rx.config.Promise then fall back to
     * the native Promise constructor if available.
     * @return {Promise<T>} An ES2015 compatible promise with the last value from
     * the observable sequence.
     * @method toPromise
     * @owner Observable
     */
    function toPromise(PromiseCtor) {
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor((resolve, reject) => {
            let value;
            this.subscribe((x) => value = x, (err) => reject(err), () => resolve(value));
        });
    }
    exports_1("toPromise", toPromise);
    var root_1;
    return {
        setters: [
            function (root_1_1) {
                root_1 = root_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=toPromise.js.map