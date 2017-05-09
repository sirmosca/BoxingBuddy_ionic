System.register(["../../util/root", "../../util/tryCatch", "../../util/errorObject", "../../Observable", "../../Subscriber", "../../operator/map"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function getCORSRequest() {
        if (root_1.root.XMLHttpRequest) {
            return new root_1.root.XMLHttpRequest();
        }
        else if (!!root_1.root.XDomainRequest) {
            return new root_1.root.XDomainRequest();
        }
        else {
            throw new Error('CORS is not supported by your browser');
        }
    }
    function getXMLHttpRequest() {
        if (root_1.root.XMLHttpRequest) {
            return new root_1.root.XMLHttpRequest();
        }
        else {
            let progId;
            try {
                const progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];
                for (let i = 0; i < 3; i++) {
                    try {
                        progId = progIds[i];
                        if (new root_1.root.ActiveXObject(progId)) {
                            break;
                        }
                    }
                    catch (e) {
                        //suppress exceptions
                    }
                }
                return new root_1.root.ActiveXObject(progId);
            }
            catch (e) {
                throw new Error('XMLHttpRequest is not supported by your browser');
            }
        }
    }
    function ajaxGet(url, headers = null) {
        return new AjaxObservable({ method: 'GET', url, headers });
    }
    exports_1("ajaxGet", ajaxGet);
    function ajaxPost(url, body, headers) {
        return new AjaxObservable({ method: 'POST', url, body, headers });
    }
    exports_1("ajaxPost", ajaxPost);
    function ajaxDelete(url, headers) {
        return new AjaxObservable({ method: 'DELETE', url, headers });
    }
    exports_1("ajaxDelete", ajaxDelete);
    function ajaxPut(url, body, headers) {
        return new AjaxObservable({ method: 'PUT', url, body, headers });
    }
    exports_1("ajaxPut", ajaxPut);
    function ajaxPatch(url, body, headers) {
        return new AjaxObservable({ method: 'PATCH', url, body, headers });
    }
    exports_1("ajaxPatch", ajaxPatch);
    function ajaxGetJSON(url, headers) {
        return new AjaxObservable({ method: 'GET', url, responseType: 'json', headers })
            .lift(new map_1.MapOperator((x, index) => x.response, null));
    }
    exports_1("ajaxGetJSON", ajaxGetJSON);
    var root_1, tryCatch_1, errorObject_1, Observable_1, Subscriber_1, map_1, AjaxObservable, AjaxSubscriber, AjaxResponse, AjaxError, AjaxTimeoutError;
    return {
        setters: [
            function (root_1_1) {
                root_1 = root_1_1;
            },
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (map_1_1) {
                map_1 = map_1_1;
            }
        ],
        execute: function () {
            ;
            ;
            ;
            ;
            ;
            ;
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @extends {Ignored}
             * @hide true
             */
            AjaxObservable = class AjaxObservable extends Observable_1.Observable {
                constructor(urlOrRequest) {
                    super();
                    const request = {
                        async: true,
                        createXHR: function () {
                            return this.crossDomain ? getCORSRequest.call(this) : getXMLHttpRequest();
                        },
                        crossDomain: false,
                        withCredentials: false,
                        headers: {},
                        method: 'GET',
                        responseType: 'json',
                        timeout: 0
                    };
                    if (typeof urlOrRequest === 'string') {
                        request.url = urlOrRequest;
                    }
                    else {
                        for (const prop in urlOrRequest) {
                            if (urlOrRequest.hasOwnProperty(prop)) {
                                request[prop] = urlOrRequest[prop];
                            }
                        }
                    }
                    this.request = request;
                }
                _subscribe(subscriber) {
                    return new AjaxSubscriber(subscriber, this.request);
                }
            };
            /**
             * Creates an observable for an Ajax request with either a request object with
             * url, headers, etc or a string for a URL.
             *
             * @example
             * source = Rx.Observable.ajax('/products');
             * source = Rx.Observable.ajax({ url: 'products', method: 'GET' });
             *
             * @param {string|Object} request Can be one of the following:
             *   A string of the URL to make the Ajax call.
             *   An object with the following properties
             *   - url: URL of the request
             *   - body: The body of the request
             *   - method: Method of the request, such as GET, POST, PUT, PATCH, DELETE
             *   - async: Whether the request is async
             *   - headers: Optional headers
             *   - crossDomain: true if a cross domain request, else false
             *   - createXHR: a function to override if you need to use an alternate
             *   XMLHttpRequest implementation.
             *   - resultSelector: a function to use to alter the output value type of
             *   the Observable. Gets {@link AjaxResponse} as an argument.
             * @return {Observable} An observable sequence containing the XMLHttpRequest.
             * @static true
             * @name ajax
             * @owner Observable
            */
            AjaxObservable.create = (() => {
                const create = (urlOrRequest) => {
                    return new AjaxObservable(urlOrRequest);
                };
                create.get = ajaxGet;
                create.post = ajaxPost;
                create.delete = ajaxDelete;
                create.put = ajaxPut;
                create.patch = ajaxPatch;
                create.getJSON = ajaxGetJSON;
                return create;
            })();
            exports_1("AjaxObservable", AjaxObservable);
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            AjaxSubscriber = class AjaxSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, request) {
                    super(destination);
                    this.request = request;
                    this.done = false;
                    const headers = request.headers = request.headers || {};
                    // force CORS if requested
                    if (!request.crossDomain && !headers['X-Requested-With']) {
                        headers['X-Requested-With'] = 'XMLHttpRequest';
                    }
                    // ensure content type is set
                    if (!('Content-Type' in headers) && !(root_1.root.FormData && request.body instanceof root_1.root.FormData) && typeof request.body !== 'undefined') {
                        headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
                    }
                    // properly serialize body
                    request.body = this.serializeBody(request.body, request.headers['Content-Type']);
                    this.send();
                }
                next(e) {
                    this.done = true;
                    const { xhr, request, destination } = this;
                    const response = new AjaxResponse(e, xhr, request);
                    destination.next(response);
                }
                send() {
                    const { request, request: { user, method, url, async, password, headers, body } } = this;
                    const createXHR = request.createXHR;
                    const xhr = tryCatch_1.tryCatch(createXHR).call(request);
                    if (xhr === errorObject_1.errorObject) {
                        this.error(errorObject_1.errorObject.e);
                    }
                    else {
                        this.xhr = xhr;
                        // set up the events before open XHR
                        // https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
                        // You need to add the event listeners before calling open() on the request.
                        // Otherwise the progress events will not fire.
                        this.setupEvents(xhr, request);
                        // open XHR
                        let result;
                        if (user) {
                            result = tryCatch_1.tryCatch(xhr.open).call(xhr, method, url, async, user, password);
                        }
                        else {
                            result = tryCatch_1.tryCatch(xhr.open).call(xhr, method, url, async);
                        }
                        if (result === errorObject_1.errorObject) {
                            this.error(errorObject_1.errorObject.e);
                            return null;
                        }
                        // timeout, responseType and withCredentials can be set once the XHR is open
                        xhr.timeout = request.timeout;
                        xhr.responseType = request.responseType;
                        if ('withCredentials' in xhr) {
                            xhr.withCredentials = !!request.withCredentials;
                        }
                        // set headers
                        this.setHeaders(xhr, headers);
                        // finally send the request
                        result = body ? tryCatch_1.tryCatch(xhr.send).call(xhr, body) : tryCatch_1.tryCatch(xhr.send).call(xhr);
                        if (result === errorObject_1.errorObject) {
                            this.error(errorObject_1.errorObject.e);
                            return null;
                        }
                    }
                    return xhr;
                }
                serializeBody(body, contentType) {
                    if (!body || typeof body === 'string') {
                        return body;
                    }
                    else if (root_1.root.FormData && body instanceof root_1.root.FormData) {
                        return body;
                    }
                    if (contentType) {
                        const splitIndex = contentType.indexOf(';');
                        if (splitIndex !== -1) {
                            contentType = contentType.substring(0, splitIndex);
                        }
                    }
                    switch (contentType) {
                        case 'application/x-www-form-urlencoded':
                            return Object.keys(body).map(key => `${encodeURI(key)}=${encodeURI(body[key])}`).join('&');
                        case 'application/json':
                            return JSON.stringify(body);
                        default:
                            return body;
                    }
                }
                setHeaders(xhr, headers) {
                    for (let key in headers) {
                        if (headers.hasOwnProperty(key)) {
                            xhr.setRequestHeader(key, headers[key]);
                        }
                    }
                }
                setupEvents(xhr, request) {
                    const progressSubscriber = request.progressSubscriber;
                    function xhrTimeout(e) {
                        const { subscriber, progressSubscriber, request } = xhrTimeout;
                        if (progressSubscriber) {
                            progressSubscriber.error(e);
                        }
                        subscriber.error(new AjaxTimeoutError(this, request)); //TODO: Make betterer.
                    }
                    ;
                    xhr.ontimeout = xhrTimeout;
                    xhrTimeout.request = request;
                    xhrTimeout.subscriber = this;
                    xhrTimeout.progressSubscriber = progressSubscriber;
                    if (xhr.upload && 'withCredentials' in xhr) {
                        if (progressSubscriber) {
                            let xhrProgress;
                            xhrProgress = function (e) {
                                const { progressSubscriber } = xhrProgress;
                                progressSubscriber.next(e);
                            };
                            if (root_1.root.XDomainRequest) {
                                xhr.onprogress = xhrProgress;
                            }
                            else {
                                xhr.upload.onprogress = xhrProgress;
                            }
                            xhrProgress.progressSubscriber = progressSubscriber;
                        }
                        let xhrError;
                        xhrError = function (e) {
                            const { progressSubscriber, subscriber, request } = xhrError;
                            if (progressSubscriber) {
                                progressSubscriber.error(e);
                            }
                            subscriber.error(new AjaxError('ajax error', this, request));
                        };
                        xhr.onerror = xhrError;
                        xhrError.request = request;
                        xhrError.subscriber = this;
                        xhrError.progressSubscriber = progressSubscriber;
                    }
                    function xhrReadyStateChange(e) {
                        const { subscriber, progressSubscriber, request } = xhrReadyStateChange;
                        if (this.readyState === 4) {
                            // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
                            let status = this.status === 1223 ? 204 : this.status;
                            let response = (this.responseType === 'text' ? (this.response || this.responseText) : this.response);
                            // fix status code when it is 0 (0 status is undocumented).
                            // Occurs when accessing file resources or on Android 4.1 stock browser
                            // while retrieving files from application cache.
                            if (status === 0) {
                                status = response ? 200 : 0;
                            }
                            if (200 <= status && status < 300) {
                                if (progressSubscriber) {
                                    progressSubscriber.complete();
                                }
                                subscriber.next(e);
                                subscriber.complete();
                            }
                            else {
                                if (progressSubscriber) {
                                    progressSubscriber.error(e);
                                }
                                subscriber.error(new AjaxError('ajax error ' + status, this, request));
                            }
                        }
                    }
                    ;
                    xhr.onreadystatechange = xhrReadyStateChange;
                    xhrReadyStateChange.subscriber = this;
                    xhrReadyStateChange.progressSubscriber = progressSubscriber;
                    xhrReadyStateChange.request = request;
                }
                unsubscribe() {
                    const { done, xhr } = this;
                    if (!done && xhr && xhr.readyState !== 4 && typeof xhr.abort === 'function') {
                        xhr.abort();
                    }
                    super.unsubscribe();
                }
            };
            exports_1("AjaxSubscriber", AjaxSubscriber);
            /**
             * A normalized AJAX response.
             *
             * @see {@link ajax}
             *
             * @class AjaxResponse
             */
            AjaxResponse = class AjaxResponse {
                constructor(originalEvent, xhr, request) {
                    this.originalEvent = originalEvent;
                    this.xhr = xhr;
                    this.request = request;
                    this.status = xhr.status;
                    this.responseType = xhr.responseType || request.responseType;
                    switch (this.responseType) {
                        case 'json':
                            if ('response' in xhr) {
                                //IE does not support json as responseType, parse it internally
                                this.response = xhr.responseType ? xhr.response : JSON.parse(xhr.response || xhr.responseText || 'null');
                            }
                            else {
                                this.response = JSON.parse(xhr.responseText || 'null');
                            }
                            break;
                        case 'xml':
                            this.response = xhr.responseXML;
                            break;
                        case 'text':
                        default:
                            this.response = ('response' in xhr) ? xhr.response : xhr.responseText;
                            break;
                    }
                }
            };
            exports_1("AjaxResponse", AjaxResponse);
            /**
             * A normalized AJAX error.
             *
             * @see {@link ajax}
             *
             * @class AjaxError
             */
            AjaxError = class AjaxError extends Error {
                constructor(message, xhr, request) {
                    super(message);
                    this.message = message;
                    this.xhr = xhr;
                    this.request = request;
                    this.status = xhr.status;
                }
            };
            exports_1("AjaxError", AjaxError);
            /**
             * @see {@link ajax}
             *
             * @class AjaxTimeoutError
             */
            AjaxTimeoutError = class AjaxTimeoutError extends AjaxError {
                constructor(xhr, request) {
                    super('ajax timeout', xhr, request);
                }
            };
            exports_1("AjaxTimeoutError", AjaxTimeoutError);
        }
    };
});
//# sourceMappingURL=AjaxObservable.js.map