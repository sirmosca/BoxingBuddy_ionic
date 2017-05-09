System.register(["../OuterSubscriber", "../util/subscribeToResult"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Buffers the source Observable values until `closingNotifier` emits.
     *
     * <span class="informal">Collects values from the past as an array, and emits
     * that array only when another Observable emits.</span>
     *
     * <img src="./img/buffer.png" width="100%">
     *
     * Buffers the incoming Observable values until the given `closingNotifier`
     * Observable emits a value, at which point it emits the buffer on the output
     * Observable and starts a new buffer internally, awaiting the next time
     * `closingNotifier` emits.
     *
     * @example <caption>On every click, emit array of most recent interval events</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var interval = Rx.Observable.interval(1000);
     * var buffered = interval.buffer(clicks);
     * buffered.subscribe(x => console.log(x));
     *
     * @see {@link bufferCount}
     * @see {@link bufferTime}
     * @see {@link bufferToggle}
     * @see {@link bufferWhen}
     * @see {@link window}
     *
     * @param {Observable<any>} closingNotifier An Observable that signals the
     * buffer to be emitted on the output Observable.
     * @return {Observable<T[]>} An Observable of buffers, which are arrays of
     * values.
     * @method buffer
     * @owner Observable
     */
    function buffer(closingNotifier) {
        return this.lift(new BufferOperator(closingNotifier));
    }
    exports_1("buffer", buffer);
    var OuterSubscriber_1, subscribeToResult_1, BufferOperator, BufferSubscriber;
    return {
        setters: [
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }
        ],
        execute: function () {
            BufferOperator = class BufferOperator {
                constructor(closingNotifier) {
                    this.closingNotifier = closingNotifier;
                }
                call(subscriber, source) {
                    return source.subscribe(new BufferSubscriber(subscriber, this.closingNotifier));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            BufferSubscriber = class BufferSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, closingNotifier) {
                    super(destination);
                    this.buffer = [];
                    this.add(subscribeToResult_1.subscribeToResult(this, closingNotifier));
                }
                _next(value) {
                    this.buffer.push(value);
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    const buffer = this.buffer;
                    this.buffer = [];
                    this.destination.next(buffer);
                }
            };
        }
    };
});
//# sourceMappingURL=buffer.js.map