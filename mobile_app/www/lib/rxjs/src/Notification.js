System.register(["./Observable"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, Notification;
    return {
        setters: [
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }
        ],
        execute: function () {
            /**
             * Represents a push-based event or value that an {@link Observable} can emit.
             * This class is particularly useful for operators that manage notifications,
             * like {@link materialize}, {@link dematerialize}, {@link observeOn}, and
             * others. Besides wrapping the actual delivered value, it also annotates it
             * with metadata of, for instance, what type of push message it is (`next`,
             * `error`, or `complete`).
             *
             * @see {@link materialize}
             * @see {@link dematerialize}
             * @see {@link observeOn}
             *
             * @class Notification<T>
             */
            Notification = class Notification {
                constructor(kind, value, error) {
                    this.kind = kind;
                    this.value = value;
                    this.error = error;
                    this.hasValue = kind === 'N';
                }
                /**
                 * Delivers to the given `observer` the value wrapped by this Notification.
                 * @param {Observer} observer
                 * @return
                 */
                observe(observer) {
                    switch (this.kind) {
                        case 'N':
                            return observer.next && observer.next(this.value);
                        case 'E':
                            return observer.error && observer.error(this.error);
                        case 'C':
                            return observer.complete && observer.complete();
                    }
                }
                /**
                 * Given some {@link Observer} callbacks, deliver the value represented by the
                 * current Notification to the correctly corresponding callback.
                 * @param {function(value: T): void} next An Observer `next` callback.
                 * @param {function(err: any): void} [error] An Observer `error` callback.
                 * @param {function(): void} [complete] An Observer `complete` callback.
                 * @return {any}
                 */
                do(next, error, complete) {
                    const kind = this.kind;
                    switch (kind) {
                        case 'N':
                            return next && next(this.value);
                        case 'E':
                            return error && error(this.error);
                        case 'C':
                            return complete && complete();
                    }
                }
                /**
                 * Takes an Observer or its individual callback functions, and calls `observe`
                 * or `do` methods accordingly.
                 * @param {Observer|function(value: T): void} nextOrObserver An Observer or
                 * the `next` callback.
                 * @param {function(err: any): void} [error] An Observer `error` callback.
                 * @param {function(): void} [complete] An Observer `complete` callback.
                 * @return {any}
                 */
                accept(nextOrObserver, error, complete) {
                    if (nextOrObserver && typeof nextOrObserver.next === 'function') {
                        return this.observe(nextOrObserver);
                    }
                    else {
                        return this.do(nextOrObserver, error, complete);
                    }
                }
                /**
                 * Returns a simple Observable that just delivers the notification represented
                 * by this Notification instance.
                 * @return {any}
                 */
                toObservable() {
                    const kind = this.kind;
                    switch (kind) {
                        case 'N':
                            return Observable_1.Observable.of(this.value);
                        case 'E':
                            return Observable_1.Observable.throw(this.error);
                        case 'C':
                            return Observable_1.Observable.empty();
                    }
                    throw new Error('unexpected notification kind value');
                }
                /**
                 * A shortcut to create a Notification instance of the type `next` from a
                 * given value.
                 * @param {T} value The `next` value.
                 * @return {Notification<T>} The "next" Notification representing the
                 * argument.
                 */
                static createNext(value) {
                    if (typeof value !== 'undefined') {
                        return new Notification('N', value);
                    }
                    return this.undefinedValueNotification;
                }
                /**
                 * A shortcut to create a Notification instance of the type `error` from a
                 * given error.
                 * @param {any} [err] The `error` error.
                 * @return {Notification<T>} The "error" Notification representing the
                 * argument.
                 */
                static createError(err) {
                    return new Notification('E', undefined, err);
                }
                /**
                 * A shortcut to create a Notification instance of the type `complete`.
                 * @return {Notification<any>} The valueless "complete" Notification.
                 */
                static createComplete() {
                    return this.completeNotification;
                }
            };
            Notification.completeNotification = new Notification('C');
            Notification.undefinedValueNotification = new Notification('N', undefined);
            exports_1("Notification", Notification);
        }
    };
});
//# sourceMappingURL=Notification.js.map