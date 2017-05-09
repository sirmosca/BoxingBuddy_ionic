System.register(["../OuterSubscriber", "../util/subscribeToResult"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Catches errors on the observable to be handled by returning a new observable or throwing an error.
     *
     * <img src="./img/catch.png" width="100%">
     *
     * @example <caption>Continues with a different Observable when there's an error</caption>
     *
     * Observable.of(1, 2, 3, 4, 5)
     *   .map(n => {
     * 	   if (n == 4) {
     * 	     throw 'four!';
     *     }
     *	   return n;
     *   })
     *   .catch(err => Observable.of('I', 'II', 'III', 'IV', 'V'))
     *   .subscribe(x => console.log(x));
     *   // 1, 2, 3, I, II, III, IV, V
     *
     * @example <caption>Retries the caught source Observable again in case of error, similar to retry() operator</caption>
     *
     * Observable.of(1, 2, 3, 4, 5)
     *   .map(n => {
     * 	   if (n === 4) {
     * 	     throw 'four!';
     *     }
     * 	   return n;
     *   })
     *   .catch((err, caught) => caught)
     *   .take(30)
     *   .subscribe(x => console.log(x));
     *   // 1, 2, 3, 1, 2, 3, ...
     *
     * @example <caption>Throws a new error when the source Observable throws an error</caption>
     *
     * Observable.of(1, 2, 3, 4, 5)
     *   .map(n => {
     *     if (n == 4) {
     *       throw 'four!';
     *     }
     *     return n;
     *   })
     *   .catch(err => {
     *     throw 'error in source. Details: ' + err;
     *   })
     *   .subscribe(
     *     x => console.log(x),
     *     err => console.log(err)
     *   );
     *   // 1, 2, 3, error in source. Details: four!
     *
     * @param {function} selector a function that takes as arguments `err`, which is the error, and `caught`, which
     *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
     *  is returned by the `selector` will be used to continue the observable chain.
     * @return {Observable} An observable that originates from either the source or the observable returned by the
     *  catch `selector` function.
     * @method catch
     * @name catch
     * @owner Observable
     */
    function _catch(selector) {
        const operator = new CatchOperator(selector);
        const caught = this.lift(operator);
        return (operator.caught = caught);
    }
    exports_1("_catch", _catch);
    var OuterSubscriber_1, subscribeToResult_1, CatchOperator, CatchSubscriber;
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
            CatchOperator = class CatchOperator {
                constructor(selector) {
                    this.selector = selector;
                }
                call(subscriber, source) {
                    return source.subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
                }
            };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            CatchSubscriber = class CatchSubscriber extends OuterSubscriber_1.OuterSubscriber {
                constructor(destination, selector, caught) {
                    super(destination);
                    this.selector = selector;
                    this.caught = caught;
                }
                // NOTE: overriding `error` instead of `_error` because we don't want
                // to have this flag this subscriber as `isStopped`. We can mimic the
                // behavior of the RetrySubscriber (from the `retry` operator), where
                // we unsubscribe from our source chain, reset our Subscriber flags,
                // then subscribe to the selector result.
                error(err) {
                    if (!this.isStopped) {
                        let result;
                        try {
                            result = this.selector(err, this.caught);
                        }
                        catch (err2) {
                            super.error(err2);
                            return;
                        }
                        this._unsubscribeAndRecycle();
                        this.add(subscribeToResult_1.subscribeToResult(this, result));
                    }
                }
            };
        }
    };
});
//# sourceMappingURL=catch.js.map