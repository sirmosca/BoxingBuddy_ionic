System.register(["../Subscriber", "../scheduler/async"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * @param scheduler
     * @return {Observable<Timestamp<any>>|WebSocketSubject<T>|Observable<T>}
     * @method timestamp
     * @owner Observable
     */
    function timestamp(scheduler = async_1.async) {
        return this.lift(new TimestampOperator(scheduler));
    }
    exports_1("timestamp", timestamp);
    var Subscriber_1, async_1, Timestamp, TimestampOperator, TimestampSubscriber;
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
            Timestamp = class Timestamp {
                constructor(value, timestamp) {
                    this.value = value;
                    this.timestamp = timestamp;
                }
            };
            exports_1("Timestamp", Timestamp);
            ;
            TimestampOperator = class TimestampOperator {
                constructor(scheduler) {
                    this.scheduler = scheduler;
                }
                call(observer, source) {
                    return source.subscribe(new TimestampSubscriber(observer, this.scheduler));
                }
            };
            TimestampSubscriber = class TimestampSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, scheduler) {
                    super(destination);
                    this.scheduler = scheduler;
                }
                _next(value) {
                    const now = this.scheduler.now();
                    this.destination.next(new Timestamp(value, now));
                }
            };
        }
    };
});
//# sourceMappingURL=timestamp.js.map