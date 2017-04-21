'use strict';

angular.
  module('boxingBuddyApp').
  animation('.mainBoxingGlove', function boxingBuddyAnimationFactory() {
    return {
      addClass: animateIn,
      removeClass: animateOut
    };

  function animateIn(element, className, done) {
    element.css({
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 200,
      height: 200,
      width: 100
    }).animate({
      height: 400,
      width: 200,
      top: -100,
      left: 160
    }, 500, done);

    return function animateInEnd(wasCanceled) {
      if (wasCanceled) element.stop();
    };
  }

  function animateOut(element, className, done) {
    element.css({
      display: 'none'
    }).animate({
    }, done);

    return function animateOutEnd(wasCanceled) {
      if (wasCanceled) element.stop();
    };
  }
  
});
