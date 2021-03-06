System.register(["../util/tryCatch", "../util/errorObject", "../OuterSubscriber", "../util/subscribeToResult"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /* tslint:enable:max-line-length */
    /**
     * Recursively projects each source value to an Observable which is merged in
     * the output Observable.
     *
     * <span class="informal">It's similar to {@link mergeMap}, but applies the
     * projection function to every source value as well as every output value.
     * It's recursive.</span>
     *
     * <img src="./img/expand.png" width="100%">
     *
     * Returns an Observable that emits items based on applying a function that you
     * supply to each item emitted by the source Observable, where that function
     * returns an Observable, and then merging those resulting Observables and
     * emitting the results of this merger. *Expand* will re-emit on the output
     * Observable every source value. Then, each output value is given to the
     * `project` function which returns an inner Observable to be merged on the
     * output Observable. Those output values resulting from the projection are also
     * given to the `project` function to produce new output values. This is how
     * *expand* behaves recursively.
     *
     * @example <caption>Start emitting the powers of two on every click, at most 10 of them</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var powersOfTwo = clicks
     *   .mapTo(1)
     *   .expand(x => Rx.Observable.of(2 * x).delay(1000))
     *   .take(10);
     * powersOfTwo.subscribe(x => console.log(x));
     *
     * @see {@link mergeMap}
     * @see {@link mergeScan}
     *
     * @param {function(value: T, index: number) => Observable} project A function
     * that, when applied to an item emitted by the source or the output Observable,
     * returns an Observable.
     * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
     * Observables being subscribed to concurrently.
     * @param {Scheduler} [scheduler=null] The IScheduler to use for subscribing to
     * each projected inner Observable.
     * @return {Observable} An Observable that emits the source values and also
     * result of applying the projection function to each value emitted on the
     * output Observable and and merging the results of the Observables obtained
     * from this transformation.
     * @method expand
     * @owner Observable
     */
    function expand(project, concurrent = Number.POSITIVE_INFINITY, scheduler = undefined) {
        concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
        return this.lift(new ExpandOperator(project, concurrent, scheduler));
    }
    exports_1("expand", expand);
    var tryCatch_1, errorObject_1, OuterSubscriber_1, subscribeToResult_1, ExpandOperator, ExpandSubscriber;
    return {
        setters: [
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }
        ],
        execute: function () {
            ExpandOperator = class ExpandOperator {
                constructor(project, concurrent, scheduler) {
                    this.project = project;
                    this.concurrent = concurrent;
                    this.scheduler = scheduler;
                }
                call(subscriber, source) {
                    return source.subscribe(new ExpandSubscriber(subscriber, this.project, this.concurrent, this.scheduler));
                }
            };
            exports_1("ExpandOperator", ExpandOperator);
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            ExpandSubscriber = class ExpandSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, project, concurrent, scheduler) {
                    super(destination);
                    this.project = project;
                    this.concurrent = concurrent;
                    this.scheduler = scheduler;
                    this.index = 0;
                    this.active = 0;
                    this.hasCompleted = false;
                    if (concurrent < Number.POSITIVE_INFINITY) {
                        this.buffer = [];
                    }
                }
                static dispatch(arg) {
                    const { subscriber, result, value, index } = arg;
                    subscriber.subscribeToProjection(result, value, index);
                }
                _next(value) {
                    const destination = this.destination;
                    if (destination.closed) {
                        this._complete();
                        return;
                    }
                    const index = this.index++;
                    if (this.active < this.concurrent) {
                        destination.next(value);
                        let result = tryCatch_1.tryCatch(this.project)(value, index);
                        if (result === errorObject_1.errorObject) {
                            destination.error(errorObject_1.errorObject.e);
                        }
                        else if (!this.scheduler) {
                            this.subscribeToProjection(result, value, index);
                        }
                        else {
                            const state = { subscriber: this, result, value, index };
                            this.add(this.scheduler.schedule(ExpandSubscriber.dispatch, 0, state));
                        }
                    }
                    else {
                        this.buffer.push(value);
                    }
                }
                subscribeToProjection(result, value, index) {
                    this.active++;
                    this.add(subscribeToResult_1.subscribeToResult(this, result, value, index));
                }
                _complete() {
                    this.hasCompleted = true;
                    if (this.hasCompleted && this.active === 0) {
                        this.destination.complete();
                    }
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this._next(innerValue);
                }
                notifyComplete(innerSub) {
                    const buffer = this.buffer;
                    this.remove(innerSub);
                    this.active--;
                    if (buffer && buffer.length > 0) {
                        this._next(buffer.shift());
                    }
                    if (this.hasCompleted && this.active === 0) {
                        this.destination.complete();
                    }
                }
            };
            exports_1("ExpandSubscriber", ExpandSubscriber);
        }
    };
});
//# sourceMappingURL=expand.js.map