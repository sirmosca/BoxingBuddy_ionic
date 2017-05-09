System.register(["../Subject", "../scheduler/async", "../Subscriber", "../util/isNumeric", "../util/isScheduler"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function windowTime(windowTimeSpan) {
        let scheduler = async_1.async;
        let windowCreationInterval = null;
        let maxWindowSize = Number.POSITIVE_INFINITY;
        if (isScheduler_1.isScheduler(arguments[3])) {
            scheduler = arguments[3];
        }
        if (isScheduler_1.isScheduler(arguments[2])) {
            scheduler = arguments[2];
        }
        else if (isNumeric_1.isNumeric(arguments[2])) {
            maxWindowSize = arguments[2];
        }
        if (isScheduler_1.isScheduler(arguments[1])) {
            scheduler = arguments[1];
        }
        else if (isNumeric_1.isNumeric(arguments[1])) {
            windowCreationInterval = arguments[1];
        }
        return this.lift(new WindowTimeOperator(windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler));
    }
    exports_1("windowTime", windowTime);
    function dispatchWindowTimeSpanOnly(state) {
        const { subscriber, windowTimeSpan, window } = state;
        if (window) {
            subscriber.closeWindow(window);
        }
        state.window = subscriber.openWindow();
        this.schedule(state, windowTimeSpan);
    }
    function dispatchWindowCreation(state) {
        const { windowTimeSpan, subscriber, scheduler, windowCreationInterval } = state;
        const window = subscriber.openWindow();
        const action = this;
        let context = { action, subscription: null };
        const timeSpanState = { subscriber, window, context };
        context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, timeSpanState);
        action.add(context.subscription);
        action.schedule(state, windowCreationInterval);
    }
    function dispatchWindowClose(state) {
        const { subscriber, window, context } = state;
        if (context && context.action && context.subscription) {
            context.action.remove(context.subscription);
        }
        subscriber.closeWindow(window);
    }
    var Subject_1, async_1, Subscriber_1, isNumeric_1, isScheduler_1, WindowTimeOperator, CountedSubject, WindowTimeSubscriber;
    return {
        setters: [
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (isNumeric_1_1) {
                isNumeric_1 = isNumeric_1_1;
            },
            function (isScheduler_1_1) {
                isScheduler_1 = isScheduler_1_1;
            }
        ],
        execute: function () {
            WindowTimeOperator = class WindowTimeOperator {
                constructor(windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler) {
                    this.windowTimeSpan = windowTimeSpan;
                    this.windowCreationInterval = windowCreationInterval;
                    this.maxWindowSize = maxWindowSize;
                    this.scheduler = scheduler;
                }
                call(subscriber, source) {
                    return source.subscribe(new WindowTimeSubscriber(subscriber, this.windowTimeSpan, this.windowCreationInterval, this.maxWindowSize, this.scheduler));
                }
            };
            CountedSubject = class CountedSubject extends Subject_1.Subject {
                constructor() {
                    super(...arguments);
                    this._numberOfNextedValues = 0;
                }
                next(value) {
                    this._numberOfNextedValues++;
                    super.next(value);
                }
                get numberOfNextedValues() {
                    return this._numberOfNextedValues;
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            WindowTimeSubscriber = class WindowTimeSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler) {
                    super(destination);
                    this.destination = destination;
                    this.windowTimeSpan = windowTimeSpan;
                    this.windowCreationInterval = windowCreationInterval;
                    this.maxWindowSize = maxWindowSize;
                    this.scheduler = scheduler;
                    this.windows = [];
                    const window = this.openWindow();
                    if (windowCreationInterval !== null && windowCreationInterval >= 0) {
                        const closeState = { subscriber: this, window, context: null };
                        const creationState = { windowTimeSpan, windowCreationInterval, subscriber: this, scheduler };
                        this.add(scheduler.schedule(dispatchWindowClose, windowTimeSpan, closeState));
                        this.add(scheduler.schedule(dispatchWindowCreation, windowCreationInterval, creationState));
                    }
                    else {
                        const timeSpanOnlyState = { subscriber: this, window, windowTimeSpan };
                        this.add(scheduler.schedule(dispatchWindowTimeSpanOnly, windowTimeSpan, timeSpanOnlyState));
                    }
                }
                _next(value) {
                    const windows = this.windows;
                    const len = windows.length;
                    for (let i = 0; i < len; i++) {
                        const window = windows[i];
                        if (!window.closed) {
                            window.next(value);
                            if (window.numberOfNextedValues >= this.maxWindowSize) {
                                this.closeWindow(window);
                            }
                        }
                    }
                }
                _error(err) {
                    const windows = this.windows;
                    while (windows.length > 0) {
                        windows.shift().error(err);
                    }
                    this.destination.error(err);
                }
                _complete() {
                    const windows = this.windows;
                    while (windows.length > 0) {
                        const window = windows.shift();
                        if (!window.closed) {
                            window.complete();
                        }
                    }
                    this.destination.complete();
                }
                openWindow() {
                    const window = new CountedSubject();
                    this.windows.push(window);
                    const destination = this.destination;
                    destination.next(window);
                    return window;
                }
                closeWindow(window) {
                    window.complete();
                    const windows = this.windows;
                    windows.splice(windows.indexOf(window), 1);
                }
            };
        }
    };
});
//# sourceMappingURL=windowTime.js.map