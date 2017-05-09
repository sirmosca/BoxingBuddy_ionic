System.register(["../Subject", "./multicast"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /* tslint:enable:max-line-length */
    /**
     * Returns a ConnectableObservable, which is a variety of Observable that waits until its connect method is called
     * before it begins emitting items to those Observers that have subscribed to it.
     *
     * <img src="./img/publish.png" width="100%">
     *
     * @param {Function} [selector] - Optional selector function which can use the multicasted source sequence as many times
     * as needed, without causing multiple subscriptions to the source sequence.
     * Subscribers to the given source will receive all notifications of the source from the time of the subscription on.
     * @return A ConnectableObservable that upon connection causes the source Observable to emit items to its Observers.
     * @method publish
     * @owner Observable
     */
    function publish(selector) {
        return selector ? multicast_1.multicast.call(this, () => new Subject_1.Subject(), selector) :
            multicast_1.multicast.call(this, new Subject_1.Subject());
    }
    exports_1("publish", publish);
    var Subject_1, multicast_1;
    return {
        setters: [
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (multicast_1_1) {
                multicast_1 = multicast_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=publish.js.map