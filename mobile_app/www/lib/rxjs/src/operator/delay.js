System.register(["../scheduler/async", "../util/isDate", "../Subscriber", "../Notification"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Delays the emission of items from the source Observable by a given timeout or
     * until a given Date.
     *
     * <span class="informal">Time shifts each item by some specified amount of
     * milliseconds.</span>
     *
     * <img src="./img/delay.png" width="100%">
     *
     * If the delay argument is a Number, this operator time shifts the source
     * Observable by that amount of time expressed in milliseconds. The relative
     * time intervals between the values are preserved.
     *
     * If the delay argument is a Date, this operator time shifts the start of the
     * Observable execution until the given date occurs.
     *
     * @example <caption>Delay each click by one second</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var delayedClicks = clicks.delay(1000); // each click emitted after 1 second
     * delayedClicks.subscribe(x => console.log(x));
     *
     * @example <caption>Delay all clicks until a future date happens</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var date = new Date('March 15, 2050 12:00:00'); // in the future
     * var delayedClicks = clicks.delay(date); // click emitted only after that date
     * delayedClicks.subscribe(x => console.log(x));
     *
     * @see {@link debounceTime}
     * @see {@link delayWhen}
     *
     * @param {number|Date} delay The delay duration in milliseconds (a `number`) or
     * a `Date` until which the emission of the source items is delayed.
     * @param {Scheduler} [scheduler=async] The IScheduler to use for
     * managing the timers that handle the time-shift for each item.
     * @return {Observable} An Observable that delays the emissions of the source
     * Observable by the specified timeout or Date.
     * @method delay
     * @owner Observable
     */
    function delay(delay, scheduler = async_1.async) {
        const absoluteDelay = isDate_1.isDate(delay);
        const delayFor = absoluteDelay ? (+delay - scheduler.now()) : Math.abs(delay);
        return this.lift(new DelayOperator(delayFor, scheduler));
    }
    exports_1("delay", delay);
    var async_1, isDate_1, Subscriber_1, Notification_1, DelayOperator, DelaySubscriber, DelayMessage;
    return {
        setters: [
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (isDate_1_1) {
                isDate_1 = isDate_1_1;
            },
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (Notification_1_1) {
                Notification_1 = Notification_1_1;
            }
        ],
        execute: function () {
            DelayOperator = class DelayOperator {
                constructor(delay, scheduler) {
                    this.delay = delay;
                    this.scheduler = scheduler;
                }
                call(subscriber, source) {
                    return source.subscribe(new DelaySubscriber(subscriber, this.delay, this.scheduler));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            DelaySubscriber = class DelaySubscriber extends Subscriber_1.Subscriber {
                constructor(destination, delay, scheduler) {
                    super(destination);
                    this.delay = delay;
                    this.scheduler = scheduler;
                    this.queue = [];
                    this.active = false;
                    this.errored = false;
                }
                static dispatch(state) {
                    const source = state.source;
                    const queue = source.queue;
                    const scheduler = state.scheduler;
                    const destination = state.destination;
                    while (queue.length > 0 && (queue[0].time - scheduler.now()) <= 0) {
                        queue.shift().notification.observe(destination);
                    }
                    if (queue.length > 0) {
                        const delay = Math.max(0, queue[0].time - scheduler.now());
                        this.schedule(state, delay);
                    }
                    else {
                        source.active = false;
                    }
                }
                _schedule(scheduler) {
                    this.active = true;
                    this.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
                        source: this, destination: this.destination, scheduler: scheduler
                    }));
                }
                scheduleNotification(notification) {
                    if (this.errored === true) {
                        return;
                    }
                    const scheduler = this.scheduler;
                    const message = new DelayMessage(scheduler.now() + this.delay, notification);
                    this.queue.push(message);
                    if (this.active === false) {
                        this._schedule(scheduler);
                    }
                }
                _next(value) {
                    this.scheduleNotification(Notification_1.Notification.createNext(value));
                }
                _error(err) {
                    this.errored = true;
                    this.queue = [];
                    this.destination.error(err);
                }
                _complete() {
                    this.scheduleNotification(Notification_1.Notification.createComplete());
                }
            };
            DelayMessage = class DelayMessage {
                constructor(time, notification) {
                    this.time = time;
                    this.notification = notification;
                }
            };
        }
    };
});
//# sourceMappingURL=delay.js.map