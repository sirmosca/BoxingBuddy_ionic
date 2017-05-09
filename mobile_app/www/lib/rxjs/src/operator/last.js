System.register(["../Subscriber", "../util/EmptyError"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /* tslint:enable:max-line-length */
    /**
     * Returns an Observable that emits only the last item emitted by the source Observable.
     * It optionally takes a predicate function as a parameter, in which case, rather than emitting
     * the last item from the source Observable, the resulting Observable will emit the last item
     * from the source Observable that satisfies the predicate.
     *
     * <img src="./img/last.png" width="100%">
     *
     * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
     * callback if the Observable completes before any `next` notification was sent.
     * @param {function} predicate - The condition any source emitted item has to satisfy.
     * @return {Observable} An Observable that emits only the last item satisfying the given condition
     * from the source, or an NoSuchElementException if no such items are emitted.
     * @throws - Throws if no items that match the predicate are emitted by the source Observable.
     * @method last
     * @owner Observable
     */
    function last(predicate, resultSelector, defaultValue) {
        return this.lift(new LastOperator(predicate, resultSelector, defaultValue, this));
    }
    exports_1("last", last);
    var Subscriber_1, EmptyError_1, LastOperator, LastSubscriber;
    return {
        setters: [
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (EmptyError_1_1) {
                EmptyError_1 = EmptyError_1_1;
            }
        ],
        execute: function () {
            LastOperator = class LastOperator {
                constructor(predicate, resultSelector, defaultValue, source) {
                    this.predicate = predicate;
                    this.resultSelector = resultSelector;
                    this.defaultValue = defaultValue;
                    this.source = source;
                }
                call(observer, source) {
                    return source.subscribe(new LastSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            LastSubscriber = class LastSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, predicate, resultSelector, defaultValue, source) {
                    super(destination);
                    this.predicate = predicate;
                    this.resultSelector = resultSelector;
                    this.defaultValue = defaultValue;
                    this.source = source;
                    this.hasValue = false;
                    this.index = 0;
                    if (typeof defaultValue !== 'undefined') {
                        this.lastValue = defaultValue;
                        this.hasValue = true;
                    }
                }
                _next(value) {
                    const index = this.index++;
                    if (this.predicate) {
                        this._tryPredicate(value, index);
                    }
                    else {
                        if (this.resultSelector) {
                            this._tryResultSelector(value, index);
                            return;
                        }
                        this.lastValue = value;
                        this.hasValue = true;
                    }
                }
                _tryPredicate(value, index) {
                    let result;
                    try {
                        result = this.predicate(value, index, this.source);
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    if (result) {
                        if (this.resultSelector) {
                            this._tryResultSelector(value, index);
                            return;
                        }
                        this.lastValue = value;
                        this.hasValue = true;
                    }
                }
                _tryResultSelector(value, index) {
                    let result;
                    try {
                        result = this.resultSelector(value, index);
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    this.lastValue = result;
                    this.hasValue = true;
                }
                _complete() {
                    const destination = this.destination;
                    if (this.hasValue) {
                        destination.next(this.lastValue);
                        destination.complete();
                    }
                    else {
                        destination.error(new EmptyError_1.EmptyError);
                    }
                }
            };
        }
    };
});
//# sourceMappingURL=last.js.map