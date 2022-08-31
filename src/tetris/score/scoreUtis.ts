
export enum Level {
  EASY = "EASY", 
  MEDIUM = "MEDIUM", 
  HARD = "HARD", 
  INSANE = "INSANE", 
}

export const levelProps = Object.freeze({
  [Level.EASY]: {
    rowCompletedValue: 10,
    multipleRowCompletedValueIncrement: 0.1,
    nextLevelScoreThreshold: 100,
    gameSpeed: 1000,
  },
  [Level.MEDIUM]: {
    rowCompletedValue: 15,
    multipleRowCompletedValueIncrement: 0.2,
    nextLevelScoreThreshold: 200,
    gameSpeed: 700,
  },
  [Level.HARD]: {
    rowCompletedValue: 20,
    multipleRowCompletedValueIncrement: 0.3,
    nextLevelScoreThreshold: 300,
    gameSpeed: 500,
  },
  [Level.INSANE]: {
    rowCompletedValue: 30,
    multipleRowCompletedValueIncrement: 0.4,
    nextLevelScoreThreshold: 400,
    gameSpeed: 300,
  },
});

export const getNextScore = (
  score: number,
  completedRows: number,
  level: Level,
  scoreThresholdReachedCallback: (nextLevel: Level) => void
  ): number => {
    return 0;
}