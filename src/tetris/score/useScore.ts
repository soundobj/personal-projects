import { useState } from "react";
import stopWatch from "../../stopWatch/stopWatch";
import { levelProps, Level, getNextScore } from "./scoreUtis";

const initLevel = Level.EASY
const initLevelSpeed = levelProps[initLevel].gameSpeed;
const watch = stopWatch(initLevelSpeed);

const useScore = () => {
  const [score, setScore] = useState<number>(0);
  const [lastScore, setLastScore ] = useState<number>(0);
  const [level, setLevel] = useState<Level>(initLevel);
  const scoreMessage = 'foo'; // @TODO: show bonus messages when player clears multiple rows at once.

  const onScoreThresholdReached = (nextLevel: Level) => {
    setLevel(nextLevel);
    watch.setIntervalLength(levelProps[nextLevel].gameSpeed);
  }

  const resetLevel = () => {
    setScore(0);
    onScoreThresholdReached(Level.EASY);
  }

  const completedRowsCallback = (completedRows: number) => {
    const nextScore = getNextScore(score, completedRows, level, onScoreThresholdReached);
    setLastScore(score);
    setScore(nextScore); 
  }

  return {
    watch,
    score,
    lastScore,
    scoreMessage,
    level,
    completedRowsCallback,
    setLevel,
    resetLevel
  }
}

export default useScore;