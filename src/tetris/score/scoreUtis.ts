
export enum Level {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
  INSANE = "INSANE",
}

export const levelProps = Object.freeze({
  [Level.EASY]: {
    rowCompletedValue: 10,
    bonusPercentage: 0.1,
    nextLevelScoreThreshold: 100,
    gameSpeed: 700,
  },
  [Level.MEDIUM]: {
    rowCompletedValue: 15,
    bonusPercentage: 0.2,
    nextLevelScoreThreshold: 200,
    gameSpeed: 500,
  },
  [Level.HARD]: {
    rowCompletedValue: 20,
    bonusPercentage: 0.3,
    nextLevelScoreThreshold: 300,
    gameSpeed: 300,
  },
  [Level.INSANE]: {
    rowCompletedValue: 30,
    bonusPercentage: 0.4,
    nextLevelScoreThreshold: 400,
    gameSpeed: 100,
  },
});

export const getNextLevel = (level: Level): Level => {
  switch (level) {
    case Level.EASY:
      return Level.MEDIUM;
    case Level.MEDIUM:
      return Level.HARD;
    case Level.HARD:
      return Level.INSANE;
    case Level.INSANE:
      return Level.INSANE;
    default:
      return Level.EASY;
  }
};

export const getNextValue = (score: number, completedRows: number, level: Level): number => {
  const { rowCompletedValue, bonusPercentage } = levelProps[level];
  const nextValue = rowCompletedValue * completedRows;
  const bonus = (completedRows > 1) ? nextValue * bonusPercentage : 0;

  return score + nextValue + bonus;
};

export const getNextScore = (
  score: number,
  completedRows: number,
  level: Level,
  onScoreThresholdReached?: (nextLevel: Level) => void
): number => {
  const { nextLevelScoreThreshold } = levelProps[level];
  const nextScore = getNextValue(score, completedRows, level);

  if (nextScore >= nextLevelScoreThreshold) {
    onScoreThresholdReached && onScoreThresholdReached(getNextLevel(level))
  }

  return nextScore;
}

export const animateValue = (obj: HTMLElement, start: number, end: number, duration: number) => {
  let startTimestamp: number = 0;
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = `${Math.floor(progress * (end - start) + start)}`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// export const animateVal = (
//   start: number,
//   end: number,
//   duration: number,
//   callback: (value: number, stepTime: number) => void,
//   easing?: 'ease-out' 
// ) => {
//   if (start === end) {
//     return;
//   }
//   const range = end - start;
//   let current = start;
//   const increment = end > start ? 1 : -1;
//   let stepTime = Math.abs(Math.floor(duration / range));
//   callback(start, stepTime);

//   const timer = setInterval(() => {
//     const value = current += increment;
//     callback(value, stepTime);
//     if (current === end) {
//       clearInterval(timer);
//     }
//   }, stepTime);
// }
export const animateVal = (
  start: number,
  end: number,
  duration: number,
  callback: (value: number, stepTime: number) => void,
  easingFn: (t: number, b: number, c: number, d: number) => number
) => {
  if (start === end) {
    return;
  }
  const range = end - start;
    callback(start, 0);
  // if (easingFn) {
    for (var i = 0; i <= range; i++) {

      let time = easingFn(i, start, duration, range);
      (function (s) {
        setTimeout(function () {
          callback(start +s, time)
        }, time);
      })(i);

      console.log(time);
    }

  // } else {
  //   let current = start;
  //   const increment = end > start ? 1 : -1;
  //   let stepTime = Math.abs(Math.floor(duration / range));
  //   callback(start, stepTime);

  //   const timer = setInterval(() => {
  //     const value = current += increment;
  //     callback(value, stepTime);
  //     if (current === end) {
  //       clearInterval(timer);
  //     }
  //   }, stepTime);
  // }
}

// https://github.com/danro/jquery-easing/blob/master/jquery.easing.js

// from http://jsfiddle.net/7GQMq/3/
/*
               @t is the current time (or position) of the tween. This can be seconds or frames, steps, seconds, ms, whatever – as long as the unit is the same as is used for the total time [3].
               @b is the beginning value of the property.
               @c is the change between the beginning and destination value of the property.
               @d is the total time of the tween.
           */
// function easeInOutQuad(t, b, c, d) {
//   if ((t/=d/2) < 1) return c/2*t*t + b;
//   return -c/2 * ((--t)*(t-2) - 1) + b;
// }

export const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
  if ((t/=d/2) < 1) return c/2*t*t + b;
  return -c/2 * ((--t)*(t-2) - 1) + b;
}  
// @
// export  const easeInOutElastic = (x, t, b, c, d) => {
//   var s=1.70158;var p=0;var a=c;
//   if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
//   if (a < Math.abs(c)) { a=c; var s=p/4; }
//   else var s = p/(2*Math.PI) * Math.asin (c/a);
//   if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
//   return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
// },

// export const easeInOutQuad = (time: number, start: number, change: number, duration: number) => {
//   if ((time /= duration / 2) < 1) {
//     return change / 2 * time * time + start;
//   }
//   return -change / 2 * ((--time) * (time - 2) - 1) + start;
// } 