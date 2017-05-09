System.register(["../util/root", "../Observable", "../symbol/iterator"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function getIterator(obj) {
        const i = obj[iterator_1.iterator];
        if (!i && typeof obj === 'string') {
            return new StringIterator(obj);
        }
        if (!i && obj.length !== undefined) {
            return new ArrayIterator(obj);
        }
        if (!i) {
            throw new TypeError('object is not iterable');
        }
        return obj[iterator_1.iterator]();
    }
    function toLength(o) {
        let len = +o.length;
        if (isNaN(len)) {
            return 0;
        }
        if (len === 0 || !numberIsFinite(len)) {
            return len;
        }
        len = sign(len) * Math.floor(Math.abs(len));
        if (len <= 0) {
            return 0;
        }
        if (len > maxSafeInteger) {
            return maxSafeInteger;
        }
        return len;
    }
    function numberIsFinite(value) {
        return typeof value === 'number' && root_1.root.isFinite(value);
    }
    function sign(value) {
        let valueAsNumber = +value;
        if (valueAsNumber === 0) {
            return valueAsNumber;
        }
        if (isNaN(valueAsNumber)) {
            return valueAsNumber;
        }
        return valueAsNumber < 0 ? -1 : 1;
    }
    var root_1, Observable_1, iterator_1, IteratorObservable, StringIterator, ArrayIterator, maxSafeInteger;
    return {
        setters: [
            function (root_1_1) {
                root_1 = root_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (iterator_1_1) {
                iterator_1 = iterator_1_1;
            }
        ],
        execute: function () {
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @extends {Ignored}
             * @hide true
             */
            IteratorObservable = class IteratorObservable extends Observable_1.Observable {
                constructor(iterator, scheduler) {
                    super();
                    this.scheduler = scheduler;
                    if (iterator == null) {
                        throw new Error('iterator cannot be null.');
                    }
                    this.iterator = getIterator(iterator);
                }
                static create(iterator, scheduler) {
                    return new IteratorObservable(iterator, scheduler);
                }
                static dispatch(state) {
                    const { index, hasError, iterator, subscriber } = state;
                    if (hasError) {
                        subscriber.error(state.error);
                        return;
                    }
                    let result = iterator.next();
                    if (result.done) {
                        subscriber.complete();
                        return;
                    }
                    subscriber.next(result.value);
                    state.index = index + 1;
                    if (subscriber.closed) {
                        if (typeof iterator.return === 'function') {
                            iterator.return();
                        }
                        return;
                    }
                    this.schedule(state);
                }
                _subscribe(subscriber) {
                    let index = 0;
                    const { iterator, scheduler } = this;
                    if (scheduler) {
                        return scheduler.schedule(IteratorObservable.dispatch, 0, {
                            index, iterator, subscriber
                        });
                    }
                    else {
                        do {
                            let result = iterator.next();
                            if (result.done) {
                                subscriber.complete();
                                break;
                            }
                            else {
                                subscriber.next(result.value);
                            }
                            if (subscriber.closed) {
                                if (typeof iterator.return === 'function') {
                                    iterator.return();
                                }
                                break;
                            }
                        } while (true);
                    }
                }
            };
            exports_1("IteratorObservable", IteratorObservable);
            StringIterator = class StringIterator {
                constructor(str, idx = 0, len = str.length) {
                    this.str = str;
                    this.idx = idx;
                    this.len = len;
                }
                [iterator_1.iterator]() { return (this); }
                next() {
                    return this.idx < this.len ? {
                        done: false,
                        value: this.str.charAt(this.idx++)
                    } : {
                        done: true,
                        value: undefined
                    };
                }
            };
            ArrayIterator = class ArrayIterator {
                constructor(arr, idx = 0, len = toLength(arr)) {
                    this.arr = arr;
                    this.idx = idx;
                    this.len = len;
                }
                [iterator_1.iterator]() { return this; }
                next() {
                    return this.idx < this.len ? {
                        done: false,
                        value: this.arr[this.idx++]
                    } : {
                        done: true,
                        value: undefined
                    };
                }
            };
            maxSafeInteger = Math.pow(2, 53) - 1;
        }
    };
});
//# sourceMappingURL=IteratorObservable.js.map