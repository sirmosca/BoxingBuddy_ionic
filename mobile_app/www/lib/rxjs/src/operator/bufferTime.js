System.register(["../scheduler/async", "../Subscriber", "../util/isScheduler"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /* tslint:enable:max-line-length */
    /**
     * Buffers the source Observable values for a specific time period.
     *
     * <span class="informal">Collects values from the past as an array, and emits
     * those arrays periodically in time.</span>
     *
     * <img src="./img/bufferTime.png" width="100%">
     *
     * Buffers values from the source for a specific time duration `bufferTimeSpan`.
     * Unless the optional argument `bufferCreationInterval` is given, it emits and
     * resets the buffer every `bufferTimeSpan` milliseconds. If
     * `bufferCreationInterval` is given, this operator opens the buffer every
     * `bufferCreationInterval` milliseconds and closes (emits and resets) the
     * buffer every `bufferTimeSpan` milliseconds. When the optional argument
     * `maxBufferSize` is specified, the buffer will be closed either after
     * `bufferTimeSpan` milliseconds or when it contains `maxBufferSize` elements.
     *
     * @example <caption>Every second, emit an array of the recent click events</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var buffered = clicks.bufferTime(1000);
     * buffered.subscribe(x => console.log(x));
     *
     * @example <caption>Every 5 seconds, emit the click events from the next 2 seconds</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var buffered = clicks.bufferTime(2000, 5000);
     * buffered.subscribe(x => console.log(x));
     *
     * @see {@link buffer}
     * @see {@link bufferCount}
     * @see {@link bufferToggle}
     * @see {@link bufferWhen}
     * @see {@link windowTime}
     *
     * @param {number} bufferTimeSpan The amount of time to fill each buffer array.
     * @param {number} [bufferCreationInterval] The interval at which to start new
     * buffers.
     * @param {number} [maxBufferSize] The maximum buffer size.
     * @param {Scheduler} [scheduler=async] The scheduler on which to schedule the
     * intervals that determine buffer boundaries.
     * @return {Observable<T[]>} An observable of arrays of buffered values.
     * @method bufferTime
     * @owner Observable
     */
    function bufferTime(bufferTimeSpan) {
        let length = arguments.length;
        let scheduler = async_1.async;
        if (isScheduler_1.isScheduler(arguments[arguments.length - 1])) {
            scheduler = arguments[arguments.length - 1];
            length--;
        }
        let bufferCreationInterval = null;
        if (length >= 2) {
            bufferCreationInterval = arguments[1];
        }
        let maxBufferSize = Number.POSITIVE_INFINITY;
        if (length >= 3) {
            maxBufferSize = arguments[2];
        }
        return this.lift(new BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler));
    }
    exports_1("bufferTime", bufferTime);
    function dispatchBufferTimeSpanOnly(state) {
        const subscriber = state.subscriber;
        const prevContext = state.context;
        if (prevContext) {
            subscriber.closeContext(prevContext);
        }
        if (!subscriber.closed) {
            state.context = subscriber.openContext();
            state.context.closeAction = this.schedule(state, state.bufferTimeSpan);
        }
    }
    function dispatchBufferCreation(state) {
        const { bufferCreationInterval, bufferTimeSpan, subscriber, scheduler } = state;
        const context = subscriber.openContext();
        const action = this;
        if (!subscriber.closed) {
            subscriber.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, { subscriber, context }));
            action.schedule(state, bufferCreationInterval);
        }
    }
    function dispatchBufferClose(arg) {
        const { subscriber, context } = arg;
        subscriber.closeContext(context);
    }
    var async_1, Subscriber_1, isScheduler_1, BufferTimeOperator, Context, BufferTimeSubscriber;
    return {
        setters: [
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (isScheduler_1_1) {
                isScheduler_1 = isScheduler_1_1;
            }
        ],
        execute: function () {
            BufferTimeOperator = class BufferTimeOperator {
                constructor(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
                    this.bufferTimeSpan = bufferTimeSpan;
                    this.bufferCreationInterval = bufferCreationInterval;
                    this.maxBufferSize = maxBufferSize;
                    this.scheduler = scheduler;
                }
                call(subscriber, source) {
                    return source.subscribe(new BufferTimeSubscriber(subscriber, this.bufferTimeSpan, this.bufferCreationInterval, this.maxBufferSize, this.scheduler));
                }
            };
            Context = class Context {
                constructor() {
                    this.buffer = [];
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            BufferTimeSubscriber = class BufferTimeSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
                    super(destination);
                    this.bufferTimeSpan = bufferTimeSpan;
                    this.bufferCreationInterval = bufferCreationInterval;
                    this.maxBufferSize = maxBufferSize;
                    this.scheduler = scheduler;
                    this.contexts = [];
                    const context = this.openContext();
                    this.timespanOnly = bufferCreationInterval == null || bufferCreationInterval < 0;
                    if (this.timespanOnly) {
                        const timeSpanOnlyState = { subscriber: this, context, bufferTimeSpan };
                        this.add(context.closeAction = scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
                    }
                    else {
                        const closeState = { subscriber: this, context };
                        const creationState = { bufferTimeSpan, bufferCreationInterval, subscriber: this, scheduler };
                        this.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, closeState));
                        this.add(scheduler.schedule(dispatchBufferCreation, bufferCreationInterval, creationState));
                    }
                }
                _next(value) {
                    const contexts = this.contexts;
                    const len = contexts.length;
                    let filledBufferContext;
                    for (let i = 0; i < len; i++) {
                        const context = contexts[i];
                        const buffer = context.buffer;
                        buffer.push(value);
                        if (buffer.length == this.maxBufferSize) {
                            filledBufferContext = context;
                        }
                    }
                    if (filledBufferContext) {
                        this.onBufferFull(filledBufferContext);
                    }
                }
                _error(err) {
                    this.contexts.length = 0;
                    super._error(err);
                }
                _complete() {
                    const { contexts, destination } = this;
                    while (contexts.length > 0) {
                        const context = contexts.shift();
                        destination.next(context.buffer);
                    }
                    super._complete();
                }
                _unsubscribe() {
                    this.contexts = null;
                }
                onBufferFull(context) {
                    this.closeContext(context);
                    const closeAction = context.closeAction;
                    closeAction.unsubscribe();
                    this.remove(closeAction);
                    if (!this.closed && this.timespanOnly) {
                        context = this.openContext();
                        const bufferTimeSpan = this.bufferTimeSpan;
                        const timeSpanOnlyState = { subscriber: this, context, bufferTimeSpan };
                        this.add(context.closeAction = this.scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
                    }
                }
                openContext() {
                    const context = new Context();
                    this.contexts.push(context);
                    return context;
                }
                closeContext(context) {
                    this.destination.next(context.buffer);
                    const contexts = this.contexts;
                    const spliceIndex = contexts ? contexts.indexOf(context) : -1;
                    if (spliceIndex >= 0) {
                        contexts.splice(contexts.indexOf(context), 1);
                    }
                }
            };
        }
    };
});
//# sourceMappingURL=bufferTime.js.map