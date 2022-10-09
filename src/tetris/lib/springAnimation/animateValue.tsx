export const animateValue = (
  start: number,
  end: number,
  duration: number,
  callback: (value: number, stepTime: number) => void,
  easingFn: (t: number, b: number, c: number, d: number) => number = easeLinear
) => {
  if (start === end) {
    return;
  }
  const range = end - start;
  callback(start, 0);
  for (var i = 0; i <= range; i++) {
    let time = easingFn(i, start, duration, range);
    (function (s) {
      setTimeout(function () {
        callback(start + s, time)
      }, time);
    })(i);
  }
}

// https://github.com/danro/jquery-easing/blob/master/jquery.easing.js

// from http://jsfiddle.net/7GQMq/3/
/*
  @t is the current time (or position) of the tween. This can be seconds or frames, steps, seconds, ms, whatever – as long as the unit is the same as is used for the total time [3].
  @b is the beginning value of the property.
  @c is the change between the beginning and destination value of the property.
  @d is the total time of the tween.
*/

export const easeLinear = (t: number, b: number, c: number, d: number) => {
  return Math.abs(Math.floor(c / d)) * t;
}

export const easeOutQuad = (t: number, b: number, c: number, d: number) => -c * (t /= d) * (t - 2) + b;

export const easeInQuad = (t: number, b: number, c: number, d: number) => c * (t /= d) * t + b;

export const easeInOut = (t: number, b: number, c: number, d: number) => {
  if (t >= (d / 2)) {
    console.log('in', t);
    return easeInQuad(t, b, c, d);
  } else {
  console.log('out', t);
  return easeOutQuad(t, b, c, d);

  }
}

export const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
  if ((t /= d / 2) < 1) return c / 2 * t * t + b;
  return -c / 2 * ((--t) * (t - 2) - 1) + b;
}