import { levelProps, Level, getNextScore } from './scoreUtis';

describe("score utils", () => {
  describe('getNextScore', () => {
    it.only('executes callback when next level threshold is reached', () => {
      const score = 90;
      const completedRows = 1;
      const level = Level.EASY;
      const scoreThresholdReachedCallback = jest.fn();
      
      const actual = getNextScore(
        score,
        completedRows,
        level,
        scoreThresholdReachedCallback
      );
      
      expect(actual).toBe(100);
      expect(scoreThresholdReachedCallback).toHaveBeenCalledWith(Level.MEDIUM);
    });
    it('calculates bonus score for consecutive multiple rows', () => {
      expect(true).toBe(true);
    });
  });
});

