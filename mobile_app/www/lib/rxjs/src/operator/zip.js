System.register(["../observable/ArrayObservable", "../util/isArray", "../Subscriber", "../OuterSubscriber", "../util/subscribeToResult", "../symbol/iterator"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /* tslint:enable:max-line-length */
    /**
     * @param observables
     * @return {Observable<R>}
     * @method zip
     * @owner Observable
     */
    function zipProto(...observables) {
        return this.lift.call(zipStatic(this, ...observables));
    }
    exports_1("zipProto", zipProto);
    /* tslint:enable:max-line-length */
    /**
     * Combines multiple Observables to create an Observable whose values are calculated from the values, in order, of each
     * of its input Observables.
     *
     * If the latest parameter is a function, this function is used to compute the created value from the input values.
     * Otherwise, an array of the input values is returned.
     *
     * @example <caption>Combine age and name from different sources</caption>
     *
     * let age$ = Observable.of<number>(27, 25, 29);
     * let name$ = Observable.of<string>('Foo', 'Bar', 'Beer');
     * let isDev$ = Observable.of<boolean>(true, true, false);
     *
     * Observable
     *     .zip(age$,
     *          name$,
     *          isDev$,
     *          (age: number, name: string, isDev: boolean) => ({ age, name, isDev }))
     *     .subscribe(x => console.log(x));
     *
     * // outputs
     * // { age: 27, name: 'Foo', isDev: true }
     * // { age: 25, name: 'Bar', isDev: true }
     * // { age: 29, name: 'Beer', isDev: false }
     *
     * @param observables
     * @return {Observable<R>}
     * @static true
     * @name zip
     * @owner Observable
     */
    function zipStatic(...observables) {
        const project = observables[observables.length - 1];
        if (typeof project === 'function') {
            observables.pop();
        }
        return new ArrayObservable_1.ArrayObservable(observables).lift(new ZipOperator(project));
    }
    exports_1("zipStatic", zipStatic);
    var ArrayObservable_1, isArray_1, Subscriber_1, OuterSubscriber_1, subscribeToResult_1, iterator_1, ZipOperator, ZipSubscriber, StaticIterator, StaticArrayIterator, ZipBufferIterator;
    return {
        setters: [
            function (ArrayObservable_1_1) {
                ArrayObservable_1 = ArrayObservable_1_1;
            },
            function (isArray_1_1) {
                isArray_1 = isArray_1_1;
            },
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            },
            function (iterator_1_1) {
                iterator_1 = iterator_1_1;
            }
        ],
        execute: function () {
            ZipOperator = class ZipOperator {
                constructor(project) {
                    this.project = project;
                }
                call(subscriber, source) {
                    return source.subscribe(new ZipSubscriber(subscriber, this.project));
                }
            };
            exports_1("ZipOperator", ZipOperator);
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            ZipSubscriber = class ZipSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, project, values = Object.create(null)) {
                    super(destination);
                    this.iterators = [];
                    this.active = 0;
                    this.project = (typeof project === 'function') ? project : null;
                    this.values = values;
                }
                _next(value) {
                    const iterators = this.iterators;
                    if (isArray_1.isArray(value)) {
                        iterators.push(new StaticArrayIterator(value));
                    }
                    else if (typeof value[iterator_1.iterator] === 'function') {
                        iterators.push(new StaticIterator(value[iterator_1.iterator]()));
                    }
                    else {
                        iterators.push(new ZipBufferIterator(this.destination, this, value));
                    }
                }
                _complete() {
                    const iterators = this.iterators;
                    const len = iterators.length;
                    if (len === 0) {
                        this.destination.complete();
                        return;
                    }
                    this.active = len;
                    for (let i = 0; i < len; i++) {
                        let iterator = iterators[i];
                        if (iterator.stillUnsubscribed) {
                            this.add(iterator.subscribe(iterator, i));
                        }
                        else {
                            this.active--; // not an observable
                        }
                    }
                }
                notifyInactive() {
                    this.active--;
                    if (this.active === 0) {
                        this.destination.complete();
                    }
                }
                checkIterators() {
                    const iterators = this.iterators;
                    const len = iterators.length;
                    const destination = this.destination;
                    // abort if not all of them have values
                    for (let i = 0; i < len; i++) {
                        let iterator = iterators[i];
                        if (typeof iterator.hasValue === 'function' && !iterator.hasValue()) {
                            return;
                        }
                    }
                    let shouldComplete = false;
                    const args = [];
                    for (let i = 0; i < len; i++) {
                        let iterator = iterators[i];
                        let result = iterator.next();
                        // check to see if it's completed now that you've gotten
                        // the next value.
                        if (iterator.hasCompleted()) {
                            shouldComplete = true;
                        }
                        if (result.done) {
                            destination.complete();
                            return;
                        }
                        args.push(result.value);
                    }
                    if (this.project) {
                        this._tryProject(args);
                    }
                    else {
                        destination.next(args);
                    }
                    if (shouldComplete) {
                        destination.complete();
                    }
                }
                _tryProject(args) {
                    let result;
                    try {
                        result = this.project.apply(this, args);
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    this.destination.next(result);
                }
            };
            exports_1("ZipSubscriber", ZipSubscriber);
            StaticIterator = class StaticIterator {
                constructor(iterator) {
                    this.iterator = iterator;
                    this.nextResult = iterator.next();
                }
                hasValue() {
                    return true;
                }
                next() {
                    const result = this.nextResult;
                    this.nextResult = this.iterator.next();
                    return result;
                }
                hasCompleted() {
                    const nextResult = this.nextResult;
                    return nextResult && nextResult.done;
                }
            };
            StaticArrayIterator = class StaticArrayIterator {
                constructor(array) {
                    this.array = array;
                    this.index = 0;
                    this.length = 0;
                    this.length = array.length;
                }
                [iterator_1.iterator]() {
                    return this;
                }
                next(value) {
                    const i = this.index++;
                    const array = this.array;
                    return i < this.length ? { value: array[i], done: false } : { value: null, done: true };
                }
                hasValue() {
                    return this.array.length > this.index;
                }
                hasCompleted() {
                    return this.array.length === this.index;
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            ZipBufferIterator = class ZipBufferIterator extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, parent, observable) {
                    super(destination);
                    this.parent = parent;
                    this.observable = observable;
                    this.stillUnsubscribed = true;
                    this.buffer = [];
                    this.isComplete = false;
                }
                [iterator_1.iterator]() {
                    return this;
                }
                // NOTE: there is actually a name collision here with Subscriber.next and Iterator.next
                //    this is legit because `next()` will never be called by a subscription in this case.
                next() {
                    const buffer = this.buffer;
                    if (buffer.length === 0 && this.isComplete) {
                        return { value: null, done: true };
                    }
                    else {
                        return { value: buffer.shift(), done: false };
                    }
                }
                hasValue() {
                    return this.buffer.length > 0;
                }
                hasCompleted() {
                    return this.buffer.length === 0 && this.isComplete;
                }
                notifyComplete() {
                    if (this.buffer.length > 0) {
                        this.isComplete = true;
                        this.parent.notifyInactive();
                    }
                    else {
                        this.destination.complete();
                    }
                }
                notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.buffer.push(innerValue);
                    this.parent.checkIterators();
                }
                subscribe(value, index) {
                    return subscribeToResult_1.subscribeToResult(this, this.observable, this, index);
                }
            };
        }
    };
});
//# sourceMappingURL=zip.js.map