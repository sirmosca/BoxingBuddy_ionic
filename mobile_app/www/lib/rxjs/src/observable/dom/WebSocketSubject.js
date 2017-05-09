System.register(["../../Subject", "../../Subscriber", "../../Observable", "../../Subscription", "../../util/root", "../../ReplaySubject", "../../util/tryCatch", "../../util/errorObject", "../../util/assign"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subject_1, Subscriber_1, Observable_1, Subscription_1, root_1, ReplaySubject_1, tryCatch_1, errorObject_1, assign_1, WebSocketSubject;
    return {
        setters: [
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            },
            function (root_1_1) {
                root_1 = root_1_1;
            },
            function (ReplaySubject_1_1) {
                ReplaySubject_1 = ReplaySubject_1_1;
            },
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            },
            function (assign_1_1) {
                assign_1 = assign_1_1;
            }
        ],
        execute: function () {
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @extends {Ignored}
             * @hide true
             */
            WebSocketSubject = class WebSocketSubject extends Subject_1.AnonymousSubject {
                constructor(urlConfigOrSource, destination) {
                    if (urlConfigOrSource instanceof Observable_1.Observable) {
                        super(destination, urlConfigOrSource);
                    }
                    else {
                        super();
                        this.WebSocketCtor = root_1.root.WebSocket;
                        this._output = new Subject_1.Subject();
                        if (typeof urlConfigOrSource === 'string') {
                            this.url = urlConfigOrSource;
                        }
                        else {
                            // WARNING: config object could override important members here.
                            assign_1.assign(this, urlConfigOrSource);
                        }
                        if (!this.WebSocketCtor) {
                            throw new Error('no WebSocket constructor can be found');
                        }
                        this.destination = new ReplaySubject_1.ReplaySubject();
                    }
                }
                resultSelector(e) {
                    return JSON.parse(e.data);
                }
                /**
                 * Wrapper around the w3c-compatible WebSocket object provided by the browser.
                 *
                 * @example <caption>Wraps browser WebSocket</caption>
                 *
                 * let socket$ = Observable.webSocket('ws://localhost:8081');
                 *
                 * socket$.subscribe(
                 *    (msg) => console.log('message received: ' + msg),
                 *    (err) => console.log(err),
                 *    () => console.log('complete')
                 *  );
                 *
                 * socket$.next(JSON.stringify({ op: 'hello' }));
                 *
                 * @example <caption>Wraps WebSocket from nodejs-websocket (using node.js)</caption>
                 *
                 * import { w3cwebsocket } from 'websocket';
                 *
                 * let socket$ = Observable.webSocket({
                 *   url: 'ws://localhost:8081',
                 *   WebSocketCtor: w3cwebsocket
                 * });
                 *
                 * socket$.subscribe(
                 *    (msg) => console.log('message received: ' + msg),
                 *    (err) => console.log(err),
                 *    () => console.log('complete')
                 *  );
                 *
                 * socket$.next(JSON.stringify({ op: 'hello' }));
                 *
                 * @param {string | WebSocketSubjectConfig} urlConfigOrSource the source of the websocket as an url or a structure defining the websocket object
                 * @return {WebSocketSubject}
                 * @static true
                 * @name webSocket
                 * @owner Observable
                 */
                static create(urlConfigOrSource) {
                    return new WebSocketSubject(urlConfigOrSource);
                }
                lift(operator) {
                    const sock = new WebSocketSubject(this, this.destination);
                    sock.operator = operator;
                    return sock;
                }
                _resetState() {
                    this.socket = null;
                    if (!this.source) {
                        this.destination = new ReplaySubject_1.ReplaySubject();
                    }
                    this._output = new Subject_1.Subject();
                }
                // TODO: factor this out to be a proper Operator/Subscriber implementation and eliminate closures
                multiplex(subMsg, unsubMsg, messageFilter) {
                    const self = this;
                    return new Observable_1.Observable((observer) => {
                        const result = tryCatch_1.tryCatch(subMsg)();
                        if (result === errorObject_1.errorObject) {
                            observer.error(errorObject_1.errorObject.e);
                        }
                        else {
                            self.next(result);
                        }
                        let subscription = self.subscribe(x => {
                            const result = tryCatch_1.tryCatch(messageFilter)(x);
                            if (result === errorObject_1.errorObject) {
                                observer.error(errorObject_1.errorObject.e);
                            }
                            else if (result) {
                                observer.next(x);
                            }
                        }, err => observer.error(err), () => observer.complete());
                        return () => {
                            const result = tryCatch_1.tryCatch(unsubMsg)();
                            if (result === errorObject_1.errorObject) {
                                observer.error(errorObject_1.errorObject.e);
                            }
                            else {
                                self.next(result);
                            }
                            subscription.unsubscribe();
                        };
                    });
                }
                _connectSocket() {
                    const { WebSocketCtor } = this;
                    const observer = this._output;
                    let socket = null;
                    try {
                        socket = this.protocol ?
                            new WebSocketCtor(this.url, this.protocol) :
                            new WebSocketCtor(this.url);
                        this.socket = socket;
                        if (this.binaryType) {
                            this.socket.binaryType = this.binaryType;
                        }
                    }
                    catch (e) {
                        observer.error(e);
                        return;
                    }
                    const subscription = new Subscription_1.Subscription(() => {
                        this.socket = null;
                        if (socket && socket.readyState === 1) {
                            socket.close();
                        }
                    });
                    socket.onopen = (e) => {
                        const openObserver = this.openObserver;
                        if (openObserver) {
                            openObserver.next(e);
                        }
                        const queue = this.destination;
                        this.destination = Subscriber_1.Subscriber.create((x) => socket.readyState === 1 && socket.send(x), (e) => {
                            const closingObserver = this.closingObserver;
                            if (closingObserver) {
                                closingObserver.next(undefined);
                            }
                            if (e && e.code) {
                                socket.close(e.code, e.reason);
                            }
                            else {
                                observer.error(new TypeError('WebSocketSubject.error must be called with an object with an error code, ' +
                                    'and an optional reason: { code: number, reason: string }'));
                            }
                            this._resetState();
                        }, () => {
                            const closingObserver = this.closingObserver;
                            if (closingObserver) {
                                closingObserver.next(undefined);
                            }
                            socket.close();
                            this._resetState();
                        });
                        if (queue && queue instanceof ReplaySubject_1.ReplaySubject) {
                            subscription.add(queue.subscribe(this.destination));
                        }
                    };
                    socket.onerror = (e) => {
                        this._resetState();
                        observer.error(e);
                    };
                    socket.onclose = (e) => {
                        this._resetState();
                        const closeObserver = this.closeObserver;
                        if (closeObserver) {
                            closeObserver.next(e);
                        }
                        if (e.wasClean) {
                            observer.complete();
                        }
                        else {
                            observer.error(e);
                        }
                    };
                    socket.onmessage = (e) => {
                        const result = tryCatch_1.tryCatch(this.resultSelector)(e);
                        if (result === errorObject_1.errorObject) {
                            observer.error(errorObject_1.errorObject.e);
                        }
                        else {
                            observer.next(result);
                        }
                    };
                }
                _subscribe(subscriber) {
                    const { source } = this;
                    if (source) {
                        return source.subscribe(subscriber);
                    }
                    if (!this.socket) {
                        this._connectSocket();
                    }
                    let subscription = new Subscription_1.Subscription();
                    subscription.add(this._output.subscribe(subscriber));
                    subscription.add(() => {
                        const { socket } = this;
                        if (this._output.observers.length === 0) {
                            if (socket && socket.readyState === 1) {
                                socket.close();
                            }
                            this._resetState();
                        }
                    });
                    return subscription;
                }
                unsubscribe() {
                    const { source, socket } = this;
                    if (socket && socket.readyState === 1) {
                        socket.close();
                        this._resetState();
                    }
                    super.unsubscribe();
                    if (!source) {
                        this.destination = new ReplaySubject_1.ReplaySubject();
                    }
                }
            };
            exports_1("WebSocketSubject", WebSocketSubject);
        }
    };
});
//# sourceMappingURL=WebSocketSubject.js.map