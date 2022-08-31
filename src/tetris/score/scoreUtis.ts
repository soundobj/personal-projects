
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
    gameSpeed: 1000,
  },
  [Level.MEDIUM]: {
    rowCompletedValue: 15,
    bonusPercentage: 0.2,
    nextLevelScoreThreshold: 200,
    gameSpeed: 700,
  },
  [Level.HARD]: {
    rowCompletedValue: 20,
    bonusPercentage: 0.3,
    nextLevelScoreThreshold: 300,
    gameSpeed: 500,
  },
  [Level.INSANE]: {
    rowCompletedValue: 30,
    bonusPercentage: 0.4,
    nextLevelScoreThreshold: 400,
    gameSpeed: 300,
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
  const { 
    rowCompletedValue,
    bonusPercentage,
  } = levelProps[level];

  const nextValue = rowCompletedValue * completedRows;

  if (completedRows === 1) {
    const nextScore = score + nextValue;
    return nextScore;
  }

  const bonus = nextValue * bonusPercentage;
  return nextValue + bonus;
};

export const getNextScore = (
  score: number,
  completedRows: number,
  level: Level,
  onScoreThresholdReached?: (nextLevel: Level) => void
  ): number => {
    const {  nextLevelScoreThreshold } = levelProps[level];
    const nextScore = getNextValue(score, completedRows, level);
    
    if (nextScore >= nextLevelScoreThreshold) {
      onScoreThresholdReached && onScoreThresholdReached(getNextLevel(level))
    }

    return nextScore;
}