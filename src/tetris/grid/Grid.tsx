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
        game.map((column:number[], y) => {
          return column.map((row: number, x) => {
            const key = `${y}-${x}`;
            return (
              <div
                key={key}
                className={classnames(styles.cell, styles[`color${row}`])}>
                  {row}
                </div>
            );
          });
        })}
    </div>
  );
};

export default Grid;
