System.register(["../Subscriber", "../Notification"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * @see {@link Notification}
     *
     * @param scheduler
     * @param delay
     * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
     * @method observeOn
     * @owner Observable
     */
    function observeOn(scheduler, delay = 0) {
        return this.lift(new ObserveOnOperator(scheduler, delay));
    }
    exports_1("observeOn", observeOn);
    var Subscriber_1, Notification_1, ObserveOnOperator, ObserveOnSubscriber, ObserveOnMessage;
    return {
        setters: [
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (Notification_1_1) {
                Notification_1 = Notification_1_1;
            }
        ],
        execute: function () {
            ObserveOnOperator = class ObserveOnOperator {
                constructor(scheduler, delay = 0) {
                    this.scheduler = scheduler;
                    this.delay = delay;
                }
                call(subscriber, source) {
                    return source.subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
                }
            };
            exports_1("ObserveOnOperator", ObserveOnOperator);
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            ObserveOnSubscriber = class ObserveOnSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, scheduler, delay = 0) {
                    super(destination);
                    this.scheduler = scheduler;
                    this.delay = delay;
                }
                static dispatch(arg) {
                    const { notification, destination } = arg;
                    notification.observe(destination);
                    this.unsubscribe();
                }
                scheduleMessage(notification) {
                    this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
                }
                _next(value) {
                    this.scheduleMessage(Notification_1.Notification.createNext(value));
                }
                _error(err) {
                    this.scheduleMessage(Notification_1.Notification.createError(err));
                }
                _complete() {
                    this.scheduleMessage(Notification_1.Notification.createComplete());
                }
            };
            exports_1("ObserveOnSubscriber", ObserveOnSubscriber);
            ObserveOnMessage = class ObserveOnMessage {
                constructor(notification, destination) {
                    this.notification = notification;
                    this.destination = destination;
                }
            };
            exports_1("ObserveOnMessage", ObserveOnMessage);
        }
    };
});
//# sourceMappingURL=observeOn.js.map