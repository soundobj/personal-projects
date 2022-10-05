import React, { useState } from 'react';

import styles from "./GameOver.module.scss"

const GameOver = (props: GameOver) => {

  const { onRestart } = props;
  const [ outro, setOutro] = useState(0);

  const onRestartClick = () => {
    onRestart();
    setOutro(1);
  }

  const outroClass = outro ? styles.outro : "";

  return (
    <article className={styles.gameOver}>
      <main className={outroClass}>
        <p>Game</p>
        <p>Over</p>
        <button
          onClick={onRestartClick}
          type="button">
            restart
        </button>
      </main>
    </article>
  )
}

type GameOver = {
  onRestart: () => void;
}

export default GameOver;