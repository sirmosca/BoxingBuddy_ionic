System.register(["../Subscriber"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Converts an Observable of {@link Notification} objects into the emissions
     * that they represent.
     *
     * <span class="informal">Unwraps {@link Notification} objects as actual `next`,
     * `error` and `complete` emissions. The opposite of {@link materialize}.</span>
     *
     * <img src="./img/dematerialize.png" width="100%">
     *
     * `dematerialize` is assumed to operate an Observable that only emits
     * {@link Notification} objects as `next` emissions, and does not emit any
     * `error`. Such Observable is the output of a `materialize` operation. Those
     * notifications are then unwrapped using the metadata they contain, and emitted
     * as `next`, `error`, and `complete` on the output Observable.
     *
     * Use this operator in conjunction with {@link materialize}.
     *
     * @example <caption>Convert an Observable of Notifications to an actual Observable</caption>
     * var notifA = new Rx.Notification('N', 'A');
     * var notifB = new Rx.Notification('N', 'B');
     * var notifE = new Rx.Notification('E', void 0,
     *   new TypeError('x.toUpperCase is not a function')
     * );
     * var materialized = Rx.Observable.of(notifA, notifB, notifE);
     * var upperCase = materialized.dematerialize();
     * upperCase.subscribe(x => console.log(x), e => console.error(e));
     *
     * // Results in:
     * // A
     * // B
     * // TypeError: x.toUpperCase is not a function
     *
     * @see {@link Notification}
     * @see {@link materialize}
     *
     * @return {Observable} An Observable that emits items and notifications
     * embedded in Notification objects emitted by the source Observable.
     * @method dematerialize
     * @owner Observable
     */
    function dematerialize() {
        return this.lift(new DeMaterializeOperator());
    }
    exports_1("dematerialize", dematerialize);
    var Subscriber_1, DeMaterializeOperator, DeMaterializeSubscriber;
    return {
        setters: [
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }
        ],
        execute: function () {
            DeMaterializeOperator = class DeMaterializeOperator {
                call(subscriber, source) {
                    return source.subscribe(new DeMaterializeSubscriber(subscriber));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            DeMaterializeSubscriber = class DeMaterializeSubscriber extends Subscriber_1.Subscriber {
                constructor(destination) {
                    super(destination);
                }
                _next(value) {
                    value.observe(this.destination);
                }
            };
        }
    };
});
//# sourceMappingURL=dematerialize.js.map