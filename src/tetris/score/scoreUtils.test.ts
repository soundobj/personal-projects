import {
  Level,
  getNextScore,
  getNextLevel,
} from './scoreUtis';

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
});
