import {
  animateVal, Level, getNextScore, getNextLevel
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
  describe('animateVal', () => {
    it.only('does stuff', () => {
      const mockFn = jest.fn();
      const callback = (value: number, stepTime: number) => {
        console.log(`value:${value}, stepTime:${stepTime}`);
        mockFn(value, stepTime);
      }; 
      animateVal(0, 10, 1200, callback)
      jest.runAllTimers();
      expect(mockFn).toBeCalledTimes(11);
      expect(mockFn).nthCalledWith(1, 0, 120);
      expect(mockFn).nthCalledWith(2, 1, 120);
    });
  });
});

