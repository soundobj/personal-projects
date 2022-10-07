import React from "react";
import classnames from 'classnames'
import styles from "./grid.module.scss"

interface Props {
  game: number[][] | undefined;
  className: string;
}

const Grid = (props: Props) => {
  const { game, className } = props;
  return (
    <div
      className={classnames(styles.grid, className)}
    >
      {game &&
        game.map((column: number[], y) => {
          return column.map((row: number, x) => {
            const key = `${y}-${x}`;
            return (
              <div
                key={key}
                className={classnames(styles.cell, styles[`color${row}`])}
              />
            );
          });
        })}
    </div>
  );
};

export default Grid;
