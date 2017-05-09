System.register(["./Subject", "./scheduler/queue", "./Subscription", "./operator/observeOn", "./util/ObjectUnsubscribedError", "./SubjectSubscription"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subject_1, queue_1, Subscription_1, observeOn_1, ObjectUnsubscribedError_1, SubjectSubscription_1, ReplaySubject, ReplayEvent;
    return {
        setters: [
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (queue_1_1) {
                queue_1 = queue_1_1;
            },
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            },
            function (observeOn_1_1) {
                observeOn_1 = observeOn_1_1;
            },
            function (ObjectUnsubscribedError_1_1) {
                ObjectUnsubscribedError_1 = ObjectUnsubscribedError_1_1;
            },
            function (SubjectSubscription_1_1) {
                SubjectSubscription_1 = SubjectSubscription_1_1;
            }
        ],
        execute: function () {
            /**
             * @class ReplaySubject<T>
             */
            ReplaySubject = class ReplaySubject extends Subject_1.Subject {
                constructor(bufferSize = Number.POSITIVE_INFINITY, windowTime = Number.POSITIVE_INFINITY, scheduler) {
                    super();
                    this.scheduler = scheduler;
                    this._events = [];
                    this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
                    this._windowTime = windowTime < 1 ? 1 : windowTime;
                }
                next(value) {
                    const now = this._getNow();
                    this._events.push(new ReplayEvent(now, value));
                    this._trimBufferThenGetEvents();
                    super.next(value);
                }
                _subscribe(subscriber) {
                    const _events = this._trimBufferThenGetEvents();
                    const scheduler = this.scheduler;
                    let subscription;
                    if (this.closed) {
                        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                    }
                    else if (this.hasError) {
                        subscription = Subscription_1.Subscription.EMPTY;
                    }
                    else if (this.isStopped) {
                        subscription = Subscription_1.Subscription.EMPTY;
                    }
                    else {
                        this.observers.push(subscriber);
                        subscription = new SubjectSubscription_1.SubjectSubscription(this, subscriber);
                    }
                    if (scheduler) {
                        subscriber.add(subscriber = new observeOn_1.ObserveOnSubscriber(subscriber, scheduler));
                    }
                    const len = _events.length;
                    for (let i = 0; i < len && !subscriber.closed; i++) {
                        subscriber.next(_events[i].value);
                    }
                    if (this.hasError) {
                        subscriber.error(this.thrownError);
                    }
                    else if (this.isStopped) {
                        subscriber.complete();
                    }
                    return subscription;
                }
                _getNow() {
                    return (this.scheduler || queue_1.queue).now();
                }
                _trimBufferThenGetEvents() {
                    const now = this._getNow();
                    const _bufferSize = this._bufferSize;
                    const _windowTime = this._windowTime;
                    const _events = this._events;
                    let eventsCount = _events.length;
                    let spliceCount = 0;
                    // Trim events that fall out of the time window.
                    // Start at the front of the list. Break early once
                    // we encounter an event that falls within the window.
                    while (spliceCount < eventsCount) {
                        if ((now - _events[spliceCount].time) < _windowTime) {
                            break;
                        }
                        spliceCount++;
                    }
                    if (eventsCount > _bufferSize) {
                        spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
                    }
                    if (spliceCount > 0) {
                        _events.splice(0, spliceCount);
                    }
                    return _events;
                }
            };
            exports_1("ReplaySubject", ReplaySubject);
            ReplayEvent = class ReplayEvent {
                constructor(time, value) {
                    this.time = time;
                    this.value = value;
                }
            };
        }
    };
});
//# sourceMappingURL=ReplaySubject.js.map