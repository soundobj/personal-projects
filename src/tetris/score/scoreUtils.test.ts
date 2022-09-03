import {
  animateValue,
  Level,
  getNextScore,
  getNextLevel,
  easeInOutQuad,
} from './scoreUtis';

jest.useFakeTimers();

describe("score utils", () => {
  describe('getNextScore', () => {
    it('executes callback when next level threshold is reached', () => {
      const score = 90;
      const completedRows = 1;
      const level = Level.EASY;
      const onScoreThresholdReached = jest.fn();

      const actual = getNextScore(
        score,
        completedRows,
        level,
        onScoreThresholdReached
      );

      expect(actual).toBe(100);
      expect(onScoreThresholdReached).toHaveBeenCalledWith(Level.MEDIUM);
    });
    it('calculates bonus score for consecutive multiple rows', () => {
      const score = 0;
      const completedRows = 2;
      const level = Level.EASY;

      const actual = getNextScore(
        score,
        completedRows,
        level,
      );

      expect(actual).toBe(22);
    });
  });
  describe('getNextLevel', () => {
    it('gets MEDIUM after EASY level', () => {
      expect(getNextLevel(Level.EASY)).toBe(Level.MEDIUM);
    });
  });
  describe('animateValue', () => {
    it('animates values linearly', () => {
      const mockFn = jest.fn();
      const callback = (value: number, stepTime: number) => {
        console.log(`value:${value}, stepTime:${stepTime}`);
        mockFn(value, stepTime);
      }; 
      animateValue(0, 10, 1200, callback)
      jest.runAllTimers();
      expect(mockFn).toBeCalledTimes(11);
      expect(mockFn).nthCalledWith(1, 0, 0);
      expect(mockFn).nthCalledWith(2, 1, 120);
    });
    // it.only('animates values easing out', () => {
    //   const mockFn = jest.fn();
    //   const callback = (value: number, stepTime: number) => {
    //     console.log(`value:${value}, stepTime:${stepTime}`);
    //     mockFn(value, stepTime);
    //   }; 
    //   animateValue(0, 10, 1200, callback, easeInOutQuad)
    //   jest.runAllTimers();
    //   // expect(mockFn).toBeCalledTimes(11);
    // });
  });
});

