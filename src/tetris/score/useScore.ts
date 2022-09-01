import { useState } from "react";
import stopWatch from "../../stopWatch/stopWatch";
import { levelProps, Level, getNextScore } from "./scoreUtis";

const useScore = () => {
  const watch = stopWatch();
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<Level>(Level.EASY);
  const scoreMessage = 'foo';

  const onScoreThresholdReached = (nextLevel: Level) => {
    setLevel(nextLevel);
    watch.setIntervalLength(levelProps[nextLevel].gameSpeed);
  }

  const completedRowsCallback = (completedRows: number) => {
    console.log('just completed rows count', completedRows);
    const nextScore = getNextScore(score, completedRows, level, onScoreThresholdReached);
    setScore(nextScore); 
  }

  return {
    watch,
    score,
    scoreMessage,
    completedRowsCallback,
  }
}

export default useScore;