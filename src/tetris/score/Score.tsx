import React from 'react';

import styles from  "./score.module.scss"

const Score = (props: Score) => {
  const { score, scoreMessage } = props;
  return (
    <div className={styles.score}>score: ${score}</div>
  )
}

type Score = {
  score: number,
  scoreMessage: string,
}  

export default Score;