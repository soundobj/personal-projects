import React, { useRef, useEffect } from 'react';

import styles from "./score.module.scss"
import { animateValue, animateVal } from './scoreUtis';

const Score = (props: Score) => {
  const { score, scoreMessage, lastScore } = props;
  const numberRef = useRef<HTMLElement>();

  const onValueUpdate = (value: number) => {
    if (numberRef && numberRef.current?.innerHTML) {
      numberRef.current.innerHTML = `${value}`;
    }
  };

  useEffect(() => {
    animateVal(lastScore, score, 1200, onValueUpdate);
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