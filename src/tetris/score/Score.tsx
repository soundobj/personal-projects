import React from 'react';
import { StopWatch } from '../../stopWatch/stopWatch';

import styles from  "./score.module.scss"

const Score = (props: Score) => {
  const { stopWatch } = props;
  // stopWatch.setIntervalLength(100);
  return (
    <div className={styles.score}>score</div>
  )
}

type Score = {
  stopWatch: StopWatch
}  

export default Score;