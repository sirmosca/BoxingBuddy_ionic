System.register(["../Subscriber", "../scheduler/async"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * @param scheduler
     * @return {Observable<TimeInterval<any>>|WebSocketSubject<T>|Observable<T>}
     * @method timeInterval
     * @owner Observable
     */
    function timeInterval(scheduler = async_1.async) {
        return this.lift(new TimeIntervalOperator(scheduler));
    }
    exports_1("timeInterval", timeInterval);
    var Subscriber_1, async_1, TimeInterval, TimeIntervalOperator, TimeIntervalSubscriber;
    return {
        setters: [
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }
        ],
        execute: function () {
            TimeInterval = class TimeInterval {
                constructor(value, interval) {
                    this.value = value;
                    this.interval = interval;
                }
            };
            exports_1("TimeInterval", TimeInterval);
            ;
            TimeIntervalOperator = class TimeIntervalOperator {
                constructor(scheduler) {
                    this.scheduler = scheduler;
                }
                call(observer, source) {
                    return source.subscribe(new TimeIntervalSubscriber(observer, this.scheduler));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            TimeIntervalSubscriber = class TimeIntervalSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, scheduler) {
                    super(destination);
                    this.scheduler = scheduler;
                    this.lastTime = 0;
                    this.lastTime = scheduler.now();
                }
                _next(value) {
                    let now = this.scheduler.now();
                    let span = now - this.lastTime;
                    this.lastTime = now;
                    this.destination.next(new TimeInterval(value, span));
                }
            };
        }
    };
});
//# sourceMappingURL=timeInterval.js.map