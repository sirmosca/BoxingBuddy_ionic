System.register(["../util/root", "../Observable"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function dispatchNext(arg) {
        const { value, subscriber } = arg;
        if (!subscriber.closed) {
            subscriber.next(value);
            subscriber.complete();
        }
    }
    function dispatchError(arg) {
        const { err, subscriber } = arg;
        if (!subscriber.closed) {
            subscriber.error(err);
        }
    }
    var root_1, Observable_1, PromiseObservable;
    return {
        setters: [
            function (root_1_1) {
                root_1 = root_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }
        ],
        execute: function () {
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @extends {Ignored}
             * @hide true
             */
            PromiseObservable = class PromiseObservable extends Observable_1.Observable {
                constructor(promise, scheduler) {
                    super();
                    this.promise = promise;
                    this.scheduler = scheduler;
                }
                /**
                 * Converts a Promise to an Observable.
                 *
                 * <span class="informal">Returns an Observable that just emits the Promise's
                 * resolved value, then completes.</span>
                 *
                 * Converts an ES2015 Promise or a Promises/A+ spec compliant Promise to an
                 * Observable. If the Promise resolves with a value, the output Observable
                 * emits that resolved value as a `next`, and then completes. If the Promise
                 * is rejected, then the output Observable emits the corresponding Error.
                 *
                 * @example <caption>Convert the Promise returned by Fetch to an Observable</caption>
                 * var result = Rx.Observable.fromPromise(fetch('http://myserver.com/'));
                 * result.subscribe(x => console.log(x), e => console.error(e));
                 *
                 * @see {@link bindCallback}
                 * @see {@link from}
                 *
                 * @param {Promise<T>} promise The promise to be converted.
                 * @param {Scheduler} [scheduler] An optional IScheduler to use for scheduling
                 * the delivery of the resolved value (or the rejection).
                 * @return {Observable<T>} An Observable which wraps the Promise.
                 * @static true
                 * @name fromPromise
                 * @owner Observable
                 */
                static create(promise, scheduler) {
                    return new PromiseObservable(promise, scheduler);
                }
                _subscribe(subscriber) {
                    const promise = this.promise;
                    const scheduler = this.scheduler;
                    if (scheduler == null) {
                        if (this._isScalar) {
                            if (!subscriber.closed) {
                                subscriber.next(this.value);
                                subscriber.complete();
                            }
                        }
                        else {
                            promise.then((value) => {
                                this.value = value;
                                this._isScalar = true;
                                if (!subscriber.closed) {
                                    subscriber.next(value);
                                    subscriber.complete();
                                }
                            }, (err) => {
                                if (!subscriber.closed) {
                                    subscriber.error(err);
                                }
                            })
                                .then(null, err => {
                                // escape the promise trap, throw unhandled errors
                                root_1.root.setTimeout(() => { throw err; });
                            });
                        }
                    }
                    else {
                        if (this._isScalar) {
                            if (!subscriber.closed) {
                                return scheduler.schedule(dispatchNext, 0, { value: this.value, subscriber });
                            }
                        }
                        else {
                            promise.then((value) => {
                                this.value = value;
                                this._isScalar = true;
                                if (!subscriber.closed) {
                                    subscriber.add(scheduler.schedule(dispatchNext, 0, { value, subscriber }));
                                }
                            }, (err) => {
                                if (!subscriber.closed) {
                                    subscriber.add(scheduler.schedule(dispatchError, 0, { err, subscriber }));
                                }
                            })
                                .then(null, (err) => {
                                // escape the promise trap, throw unhandled errors
                                root_1.root.setTimeout(() => { throw err; });
                            });
                        }
                    }
                }
            };
            exports_1("PromiseObservable", PromiseObservable);
        }
    };
});
//# sourceMappingURL=PromiseObservable.js.map