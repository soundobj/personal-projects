import React, { useRef, useEffect } from 'react';

import styles from "./score.module.scss"
import { animateValue, easeInQuad } from './scoreUtis';
import classNames from 'classnames';
const Score = (props: Score) => {
  const { score, scoreMessage, lastScore, className } = props;
  const numberRef = useRef<HTMLElement>();

  const onValueUpdate = (value: number) => {
    if (numberRef && numberRef.current?.innerHTML) {
      numberRef.current.innerHTML = `${value}`;
    }
  };

  useEffect(() => {
    // @ts-ignore
    animateValue(lastScore, score, 500, onValueUpdate, easeInQuad);
  }, [score, lastScore]);

  return (
    <dl className={styles.score}>
      <dt>score</dt>
      <dd>
        {/* @ts-ignore */}
        <span ref={numberRef} className={classNames(styles.number, className)}>
          {score}
        </span>
      </dd>
    </dl>
  )
}

type Score = {
  score: number,
  lastScore: number
  scoreMessage: string,
  className: string,
}

export default Score;