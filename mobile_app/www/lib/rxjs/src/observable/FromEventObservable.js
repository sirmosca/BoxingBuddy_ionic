System.register(["../Observable", "../util/tryCatch", "../util/isFunction", "../util/errorObject", "../Subscription"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function isNodeStyleEventEmitter(sourceObj) {
        return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
    }
    function isJQueryStyleEventEmitter(sourceObj) {
        return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
    }
    function isNodeList(sourceObj) {
        return !!sourceObj && toString.call(sourceObj) === '[object NodeList]';
    }
    function isHTMLCollection(sourceObj) {
        return !!sourceObj && toString.call(sourceObj) === '[object HTMLCollection]';
    }
    function isEventTarget(sourceObj) {
        return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
    }
    var Observable_1, tryCatch_1, isFunction_1, errorObject_1, Subscription_1, toString, FromEventObservable;
    return {
        setters: [
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (isFunction_1_1) {
                isFunction_1 = isFunction_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            },
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            }
        ],
        execute: function () {
            toString = Object.prototype.toString;
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @extends {Ignored}
             * @hide true
             */
            FromEventObservable = class FromEventObservable extends Observable_1.Observable {
                constructor(sourceObj, eventName, selector, options) {
                    super();
                    this.sourceObj = sourceObj;
                    this.eventName = eventName;
                    this.selector = selector;
                    this.options = options;
                }
                /* tslint:enable:max-line-length */
                /**
                 * Creates an Observable that emits events of a specific type coming from the
                 * given event target.
                 *
                 * <span class="informal">Creates an Observable from DOM events, or Node
                 * EventEmitter events or others.</span>
                 *
                 * <img src="./img/fromEvent.png" width="100%">
                 *
                 * Creates an Observable by attaching an event listener to an "event target",
                 * which may be an object with `addEventListener` and `removeEventListener`,
                 * a Node.js EventEmitter, a jQuery style EventEmitter, a NodeList from the
                 * DOM, or an HTMLCollection from the DOM. The event handler is attached when
                 * the output Observable is subscribed, and removed when the Subscription is
                 * unsubscribed.
                 *
                 * @example <caption>Emits clicks happening on the DOM document</caption>
                 * var clicks = Rx.Observable.fromEvent(document, 'click');
                 * clicks.subscribe(x => console.log(x));
                 *
                 * // Results in:
                 * // MouseEvent object logged to console everytime a click
                 * // occurs on the document.
                 *
                 * @see {@link from}
                 * @see {@link fromEventPattern}
                 *
                 * @param {EventTargetLike} target The DOMElement, event target, Node.js
                 * EventEmitter, NodeList or HTMLCollection to attach the event handler to.
                 * @param {string} eventName The event name of interest, being emitted by the
                 * `target`.
                 * @param {EventListenerOptions} [options] Options to pass through to addEventListener
                 * @param {SelectorMethodSignature<T>} [selector] An optional function to
                 * post-process results. It takes the arguments from the event handler and
                 * should return a single value.
                 * @return {Observable<T>}
                 * @static true
                 * @name fromEvent
                 * @owner Observable
                 */
                static create(target, eventName, options, selector) {
                    if (isFunction_1.isFunction(options)) {
                        selector = options;
                        options = undefined;
                    }
                    return new FromEventObservable(target, eventName, selector, options);
                }
                static setupSubscription(sourceObj, eventName, handler, subscriber, options) {
                    let unsubscribe;
                    if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
                        for (let i = 0, len = sourceObj.length; i < len; i++) {
                            FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
                        }
                    }
                    else if (isEventTarget(sourceObj)) {
                        const source = sourceObj;
                        sourceObj.addEventListener(eventName, handler, options);
                        unsubscribe = () => source.removeEventListener(eventName, handler);
                    }
                    else if (isJQueryStyleEventEmitter(sourceObj)) {
                        const source = sourceObj;
                        sourceObj.on(eventName, handler);
                        unsubscribe = () => source.off(eventName, handler);
                    }
                    else if (isNodeStyleEventEmitter(sourceObj)) {
                        const source = sourceObj;
                        sourceObj.addListener(eventName, handler);
                        unsubscribe = () => source.removeListener(eventName, handler);
                    }
                    else {
                        throw new TypeError('Invalid event target');
                    }
                    subscriber.add(new Subscription_1.Subscription(unsubscribe));
                }
                _subscribe(subscriber) {
                    const sourceObj = this.sourceObj;
                    const eventName = this.eventName;
                    const options = this.options;
                    const selector = this.selector;
                    let handler = selector ? (...args) => {
                        let result = tryCatch_1.tryCatch(selector)(...args);
                        if (result === errorObject_1.errorObject) {
                            subscriber.error(errorObject_1.errorObject.e);
                        }
                        else {
                            subscriber.next(result);
                        }
                    } : (e) => subscriber.next(e);
                    FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber, options);
                }
            };
            exports_1("FromEventObservable", FromEventObservable);
        }
    };
});
//# sourceMappingURL=FromEventObservable.js.map