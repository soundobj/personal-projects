import React from "react";
// @ts-ignore
import classnames from 'classnames'
import styles from  "./grid.module.scss"

interface Props {
  game: number[][] | undefined;
}

const Grid = (props: Props) => {
  const { game } = props;
  return (
    <div
      className={classnames(styles.grid)}
    >
      {game &&
        game.map((row:number[], x) => {
          return row.map((column: number, y) => {
            const key = `${x}-${y}`;
            return (
              <div key={key} className={styles.cell}>{column}</div>
            );
          });
        })}
    </div>
  );
};

export default Grid;
