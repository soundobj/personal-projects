import React, { useRef, useEffect } from 'react';

import styles from "./score.module.scss"
import { animateValue } from './scoreUtis';

const Score = (props: Score) => {
  const { score, scoreMessage, lastScore } = props;
  const numberRef = useRef<HTMLElement>();

  useEffect(() => {
    animateValue(numberRef.current, lastScore, score, 1200);
  }, [score, lastScore]);

  return (
    <div className={styles.score}>
      score:
      <span ref={numberRef} className={styles.number}>
        {score}
      </span>
    </div>
  )
}

type Score = {
  score: number,
  lastScore: number
  scoreMessage: string,
}

export default Score;