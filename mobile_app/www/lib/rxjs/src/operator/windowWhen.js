System.register(["../Subject", "../util/tryCatch", "../util/errorObject", "../OuterSubscriber", "../util/subscribeToResult"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Branch out the source Observable values as a nested Observable using a
     * factory function of closing Observables to determine when to start a new
     * window.
     *
     * <span class="informal">It's like {@link bufferWhen}, but emits a nested
     * Observable instead of an array.</span>
     *
     * <img src="./img/windowWhen.png" width="100%">
     *
     * Returns an Observable that emits windows of items it collects from the source
     * Observable. The output Observable emits connected, non-overlapping windows.
     * It emits the current window and opens a new one whenever the Observable
     * produced by the specified `closingSelector` function emits an item. The first
     * window is opened immediately when subscribing to the output Observable.
     *
     * @example <caption>Emit only the first two clicks events in every window of [1-5] random seconds</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var result = clicks
     *   .windowWhen(() => Rx.Observable.interval(1000 + Math.random() * 4000))
     *   .map(win => win.take(2)) // each window has at most 2 emissions
     *   .mergeAll(); // flatten the Observable-of-Observables
     * result.subscribe(x => console.log(x));
     *
     * @see {@link window}
     * @see {@link windowCount}
     * @see {@link windowTime}
     * @see {@link windowToggle}
     * @see {@link bufferWhen}
     *
     * @param {function(): Observable} closingSelector A function that takes no
     * arguments and returns an Observable that signals (on either `next` or
     * `complete`) when to close the previous window and start a new one.
     * @return {Observable<Observable<T>>} An observable of windows, which in turn
     * are Observables.
     * @method windowWhen
     * @owner Observable
     */
    function windowWhen(closingSelector) {
        return this.lift(new WindowOperator(closingSelector));
    }
    exports_1("windowWhen", windowWhen);
    var Subject_1, tryCatch_1, errorObject_1, OuterSubscriber_1, subscribeToResult_1, WindowOperator, WindowSubscriber;
    return {
        setters: [
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
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
            WindowOperator = class WindowOperator {
                constructor(closingSelector) {
                    this.closingSelector = closingSelector;
                }
                call(subscriber, source) {
                    return source.subscribe(new WindowSubscriber(subscriber, this.closingSelector));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            WindowSubscriber = class WindowSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, closingSelector) {
                    super(destination);
                    this.destination = destination;
                    this.closingSelector = closingSelector;
                    this.openWindow();
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.openWindow(innerSub);
                }
                notifyError(error, innerSub) {
                    this._error(error);
                }
                notifyComplete(innerSub) {
                    this.openWindow(innerSub);
                }
                _next(value) {
                    this.window.next(value);
                }
                _error(err) {
                    this.window.error(err);
                    this.destination.error(err);
                    this.unsubscribeClosingNotification();
                }
                _complete() {
                    this.window.complete();
                    this.destination.complete();
                    this.unsubscribeClosingNotification();
                }
                unsubscribeClosingNotification() {
                    if (this.closingNotification) {
                        this.closingNotification.unsubscribe();
                    }
                }
                openWindow(innerSub = null) {
                    if (innerSub) {
                        this.remove(innerSub);
                        innerSub.unsubscribe();
                    }
                    const prevWindow = this.window;
                    if (prevWindow) {
                        prevWindow.complete();
                    }
                    const window = this.window = new Subject_1.Subject();
                    this.destination.next(window);
                    const closingNotifier = tryCatch_1.tryCatch(this.closingSelector)();
                    if (closingNotifier === errorObject_1.errorObject) {
                        const err = errorObject_1.errorObject.e;
                        this.destination.error(err);
                        this.window.error(err);
                    }
                    else {
                        this.add(this.closingNotification = subscribeToResult_1.subscribeToResult(this, closingNotifier));
                    }
                }
            };
        }
    };
});
//# sourceMappingURL=windowWhen.js.map