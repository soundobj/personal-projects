import { useState } from "react";
import stopWatch from "../../stopWatch/stopWatch";
import { levelProps, Level, getNextScore } from "./scoreUtis";

const useScore = () => {
  const watch = stopWatch(levelProps[Level.EASY].gameSpeed);
  const [score, setScore] = useState<number>(0);
  const [lastScore, setLastScore ] = useState<number>(0);
  const [level, setLevel] = useState<Level>(Level.EASY);
  const scoreMessage = 'foo';

  const onScoreThresholdReached = (nextLevel: Level) => {
    setLevel(nextLevel);
    watch.setIntervalLength(levelProps[nextLevel].gameSpeed);
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
    completedRowsCallback,
  }
}

export default useScore;