import { useState, useEffect } from "react";
import stopWatch from "../../stopWatch/stopWatch";
import { levelProps, Level } from "./scoreUtis";

const useScore = () => {
  const watch = stopWatch();
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<Level>(Level.EASY);
  const scoreMessage = 'foo';

  const completedRowsCallback = (completedRows: number) => {
    console.log('just completed rows count', completedRows); 
  }

  return {
    watch,
    score,
    scoreMessage,
    completedRowsCallback,
  }
}

export default useScore;