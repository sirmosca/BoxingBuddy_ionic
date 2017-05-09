System.register(["./util/isArray", "./util/isObject", "./util/isFunction", "./util/tryCatch", "./util/errorObject", "./util/UnsubscriptionError"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function flattenUnsubscriptionErrors(errors) {
        return errors.reduce((errs, err) => errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err), []);
    }
    var isArray_1, isObject_1, isFunction_1, tryCatch_1, errorObject_1, UnsubscriptionError_1, Subscription;
    return {
        setters: [
            function (isArray_1_1) {
                isArray_1 = isArray_1_1;
            },
            function (isObject_1_1) {
                isObject_1 = isObject_1_1;
            },
            function (isFunction_1_1) {
                isFunction_1 = isFunction_1_1;
            },
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            },
            function (UnsubscriptionError_1_1) {
                UnsubscriptionError_1 = UnsubscriptionError_1_1;
            }
        ],
        execute: function () {
            /**
             * Represents a disposable resource, such as the execution of an Observable. A
             * Subscription has one important method, `unsubscribe`, that takes no argument
             * and just disposes the resource held by the subscription.
             *
             * Additionally, subscriptions may be grouped together through the `add()`
             * method, which will attach a child Subscription to the current Subscription.
             * When a Subscription is unsubscribed, all its children (and its grandchildren)
             * will be unsubscribed as well.
             *
             * @class Subscription
             */
            Subscription = class Subscription {
                /**
                 * @param {function(): void} [unsubscribe] A function describing how to
                 * perform the disposal of resources when the `unsubscribe` method is called.
                 */
                constructor(unsubscribe) {
                    /**
                     * A flag to indicate whether this Subscription has already been unsubscribed.
                     * @type {boolean}
                     */
                    this.closed = false;
                    this._parent = null;
                    this._parents = null;
                    this._subscriptions = null;
                    if (unsubscribe) {
                        this._unsubscribe = unsubscribe;
                    }
                }
                /**
                 * Disposes the resources held by the subscription. May, for instance, cancel
                 * an ongoing Observable execution or cancel any other type of work that
                 * started when the Subscription was created.
                 * @return {void}
                 */
                unsubscribe() {
                    let hasErrors = false;
                    let errors;
                    if (this.closed) {
                        return;
                    }
                    let { _parent, _parents, _unsubscribe, _subscriptions } = this;
                    this.closed = true;
                    this._parent = null;
                    this._parents = null;
                    // null out _subscriptions first so any child subscriptions that attempt
                    // to remove themselves from this subscription will noop
                    this._subscriptions = null;
                    let index = -1;
                    let len = _parents ? _parents.length : 0;
                    // if this._parent is null, then so is this._parents, and we
                    // don't have to remove ourselves from any parent subscriptions.
                    while (_parent) {
                        _parent.remove(this);
                        // if this._parents is null or index >= len,
                        // then _parent is set to null, and the loop exits
                        _parent = ++index < len && _parents[index] || null;
                    }
                    if (isFunction_1.isFunction(_unsubscribe)) {
                        let trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
                        if (trial === errorObject_1.errorObject) {
                            hasErrors = true;
                            errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?
                                flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [errorObject_1.errorObject.e]);
                        }
                    }
                    if (isArray_1.isArray(_subscriptions)) {
                        index = -1;
                        len = _subscriptions.length;
                        while (++index < len) {
                            const sub = _subscriptions[index];
                            if (isObject_1.isObject(sub)) {
                                let trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                                if (trial === errorObject_1.errorObject) {
                                    hasErrors = true;
                                    errors = errors || [];
                                    let err = errorObject_1.errorObject.e;
                                    if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                                        errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                                    }
                                    else {
                                        errors.push(err);
                                    }
                                }
                            }
                        }
                    }
                    if (hasErrors) {
                        throw new UnsubscriptionError_1.UnsubscriptionError(errors);
                    }
                }
                /**
                 * Adds a tear down to be called during the unsubscribe() of this
                 * Subscription.
                 *
                 * If the tear down being added is a subscription that is already
                 * unsubscribed, is the same reference `add` is being called on, or is
                 * `Subscription.EMPTY`, it will not be added.
                 *
                 * If this subscription is already in an `closed` state, the passed
                 * tear down logic will be executed immediately.
                 *
                 * @param {TeardownLogic} teardown The additional logic to execute on
                 * teardown.
                 * @return {Subscription} Returns the Subscription used or created to be
                 * added to the inner subscriptions list. This Subscription can be used with
                 * `remove()` to remove the passed teardown logic from the inner subscriptions
                 * list.
                 */
                add(teardown) {
                    if (!teardown || (teardown === Subscription.EMPTY)) {
                        return Subscription.EMPTY;
                    }
                    if (teardown === this) {
                        return this;
                    }
                    let subscription = teardown;
                    switch (typeof teardown) {
                        case 'function':
                            subscription = new Subscription(teardown);
                        case 'object':
                            if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                                return subscription;
                            }
                            else if (this.closed) {
                                subscription.unsubscribe();
                                return subscription;
                            }
                            else if (typeof subscription._addParent !== 'function' /* quack quack */) {
                                const tmp = subscription;
                                subscription = new Subscription();
                                subscription._subscriptions = [tmp];
                            }
                            break;
                        default:
                            throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
                    }
                    const subscriptions = this._subscriptions || (this._subscriptions = []);
                    subscriptions.push(subscription);
                    subscription._addParent(this);
                    return subscription;
                }
                /**
                 * Removes a Subscription from the internal list of subscriptions that will
                 * unsubscribe during the unsubscribe process of this Subscription.
                 * @param {Subscription} subscription The subscription to remove.
                 * @return {void}
                 */
                remove(subscription) {
                    const subscriptions = this._subscriptions;
                    if (subscriptions) {
                        const subscriptionIndex = subscriptions.indexOf(subscription);
                        if (subscriptionIndex !== -1) {
                            subscriptions.splice(subscriptionIndex, 1);
                        }
                    }
                }
                _addParent(parent) {
                    let { _parent, _parents } = this;
                    if (!_parent || _parent === parent) {
                        // If we don't have a parent, or the new parent is the same as the
                        // current parent, then set this._parent to the new parent.
                        this._parent = parent;
                    }
                    else if (!_parents) {
                        // If there's already one parent, but not multiple, allocate an Array to
                        // store the rest of the parent Subscriptions.
                        this._parents = [parent];
                    }
                    else if (_parents.indexOf(parent) === -1) {
                        // Only add the new parent to the _parents list if it's not already there.
                        _parents.push(parent);
                    }
                }
            };
            Subscription.EMPTY = (function (empty) {
                empty.closed = true;
                return empty;
            }(new Subscription()));
            exports_1("Subscription", Subscription);
        }
    };
});
//# sourceMappingURL=Subscription.js.map