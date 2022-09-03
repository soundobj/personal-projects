import React, { useRef, useEffect } from 'react';

import styles from "./score.module.scss"
import { animateValue, animateVal, easeInOutQuad } from './scoreUtis';

const Score = (props: Score) => {
  const { score, scoreMessage, lastScore } = props;
  const numberRef = useRef<HTMLElement>();

  const onValueUpdate = (value: number) => {
    if (numberRef && numberRef.current?.innerHTML) {
      numberRef.current.innerHTML = `${value}`;
    }
  };

  useEffect(() => {
    // @ts-ignore
    animateVal(lastScore, score, 1000, onValueUpdate, easeInOutQuad);
  }, [score, lastScore]);

  return (
    <div className={styles.score}>
      score:
      {/* @ts-ignore */}
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