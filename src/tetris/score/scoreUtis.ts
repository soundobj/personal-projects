
export enum Level {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
  INSANE = "INSANE",
}

export const levelProps = Object.freeze({
  [Level.EASY]: {
    rowCompletedValue: 101,
    bonusPercentage: 0.1,
    nextLevelScoreThreshold: 100,
    unitCount: 100,
    gameSpeed: 700,
  },
  [Level.MEDIUM]: {
    rowCompletedValue: 150,
    bonusPercentage: 0.2,
    nextLevelScoreThreshold: 200,
    unitCount: 100,
    gameSpeed: 500,
  },
  [Level.HARD]: {
    rowCompletedValue: 200,
    bonusPercentage: 0.3,
    nextLevelScoreThreshold: 300,
    unitCount: 100,
    gameSpeed: 300,
  },
  [Level.INSANE]: {
    rowCompletedValue: 300,
    bonusPercentage: 0.4,
    nextLevelScoreThreshold: 400,
    unitCount: 100,
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

export const animateValueue = (obj: HTMLElement, start: number, end: number, duration: number) => {
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
    // console.log(time);
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