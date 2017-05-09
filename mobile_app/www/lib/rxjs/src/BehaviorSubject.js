System.register(["./Subject", "./util/ObjectUnsubscribedError"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subject_1, ObjectUnsubscribedError_1, BehaviorSubject;
    return {
        setters: [
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (ObjectUnsubscribedError_1_1) {
                ObjectUnsubscribedError_1 = ObjectUnsubscribedError_1_1;
            }
        ],
        execute: function () {
            /**
             * @class BehaviorSubject<T>
             */
            BehaviorSubject = class BehaviorSubject extends Subject_1.Subject {
                constructor(_value) {
                    super();
                    this._value = _value;
                }
                get value() {
                    return this.getValue();
                }
                _subscribe(subscriber) {
                    const subscription = super._subscribe(subscriber);
                    if (subscription && !subscription.closed) {
                        subscriber.next(this._value);
                    }
                    return subscription;
                }
                getValue() {
                    if (this.hasError) {
                        throw this.thrownError;
                    }
                    else if (this.closed) {
                        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                    }
                    else {
                        return this._value;
                    }
                }
                next(value) {
                    super.next(this._value = value);
                }
            };
            exports_1("BehaviorSubject", BehaviorSubject);
        }
    };
});
//# sourceMappingURL=BehaviorSubject.js.map