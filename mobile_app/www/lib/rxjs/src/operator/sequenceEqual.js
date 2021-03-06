System.register(["../Subscriber", "../util/tryCatch", "../util/errorObject"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Compares all values of two observables in sequence using an optional comparor function
     * and returns an observable of a single boolean value representing whether or not the two sequences
     * are equal.
     *
     * <span class="informal">Checks to see of all values emitted by both observables are equal, in order.</span>
     *
     * <img src="./img/sequenceEqual.png" width="100%">
     *
     * `sequenceEqual` subscribes to two observables and buffers incoming values from each observable. Whenever either
     * observable emits a value, the value is buffered and the buffers are shifted and compared from the bottom
     * up; If any value pair doesn't match, the returned observable will emit `false` and complete. If one of the
     * observables completes, the operator will wait for the other observable to complete; If the other
     * observable emits before completing, the returned observable will emit `false` and complete. If one observable never
     * completes or emits after the other complets, the returned observable will never complete.
     *
     * @example <caption>figure out if the Konami code matches</caption>
     * var code = Rx.Observable.from([
     *  "ArrowUp",
     *  "ArrowUp",
     *  "ArrowDown",
     *  "ArrowDown",
     *  "ArrowLeft",
     *  "ArrowRight",
     *  "ArrowLeft",
     *  "ArrowRight",
     *  "KeyB",
     *  "KeyA",
     *  "Enter" // no start key, clearly.
     * ]);
     *
     * var keys = Rx.Observable.fromEvent(document, 'keyup')
     *  .map(e => e.code);
     * var matches = keys.bufferCount(11, 1)
     *  .mergeMap(
     *    last11 =>
     *      Rx.Observable.from(last11)
     *        .sequenceEqual(code)
     *   );
     * matches.subscribe(matched => console.log('Successful cheat at Contra? ', matched));
     *
     * @see {@link combineLatest}
     * @see {@link zip}
     * @see {@link withLatestFrom}
     *
     * @param {Observable} compareTo The observable sequence to compare the source sequence to.
     * @param {function} [comparor] An optional function to compare each value pair
     * @return {Observable} An Observable of a single boolean value representing whether or not
     * the values emitted by both observables were equal in sequence.
     * @method sequenceEqual
     * @owner Observable
     */
    function sequenceEqual(compareTo, comparor) {
        return this.lift(new SequenceEqualOperator(compareTo, comparor));
    }
    exports_1("sequenceEqual", sequenceEqual);
    var Subscriber_1, tryCatch_1, errorObject_1, SequenceEqualOperator, SequenceEqualSubscriber, SequenceEqualCompareToSubscriber;
    return {
        setters: [
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            }
        ],
        execute: function () {
            SequenceEqualOperator = class SequenceEqualOperator {
                constructor(compareTo, comparor) {
                    this.compareTo = compareTo;
                    this.comparor = comparor;
                }
                call(subscriber, source) {
                    return source.subscribe(new SequenceEqualSubscriber(subscriber, this.compareTo, this.comparor));
                }
            };
            exports_1("SequenceEqualOperator", SequenceEqualOperator);
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            SequenceEqualSubscriber = class SequenceEqualSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, compareTo, comparor) {
                    super(destination);
                    this.compareTo = compareTo;
                    this.comparor = comparor;
                    this._a = [];
                    this._b = [];
                    this._oneComplete = false;
                    this.add(compareTo.subscribe(new SequenceEqualCompareToSubscriber(destination, this)));
                }
                _next(value) {
                    if (this._oneComplete && this._b.length === 0) {
                        this.emit(false);
                    }
                    else {
                        this._a.push(value);
                        this.checkValues();
                    }
                }
                _complete() {
                    if (this._oneComplete) {
                        this.emit(this._a.length === 0 && this._b.length === 0);
                    }
                    else {
                        this._oneComplete = true;
                    }
                }
                checkValues() {
                    const { _a, _b, comparor } = this;
                    while (_a.length > 0 && _b.length > 0) {
                        let a = _a.shift();
                        let b = _b.shift();
                        let areEqual = false;
                        if (comparor) {
                            areEqual = tryCatch_1.tryCatch(comparor)(a, b);
                            if (areEqual === errorObject_1.errorObject) {
                                this.destination.error(errorObject_1.errorObject.e);
                            }
                        }
                        else {
                            areEqual = a === b;
                        }
                        if (!areEqual) {
                            this.emit(false);
                        }
                    }
                }
                emit(value) {
                    const { destination } = this;
                    destination.next(value);
                    destination.complete();
                }
                nextB(value) {
                    if (this._oneComplete && this._a.length === 0) {
                        this.emit(false);
                    }
                    else {
                        this._b.push(value);
                        this.checkValues();
                    }
                }
            };
            exports_1("SequenceEqualSubscriber", SequenceEqualSubscriber);
            SequenceEqualCompareToSubscriber = class SequenceEqualCompareToSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, parent) {
                    super(destination);
                    this.parent = parent;
                }
                _next(value) {
                    this.parent.nextB(value);
                }
                _error(err) {
                    this.parent.error(err);
                }
                _complete() {
                    this.parent._complete();
                }
            };
        }
    };
});
//# sourceMappingURL=sequenceEqual.js.map