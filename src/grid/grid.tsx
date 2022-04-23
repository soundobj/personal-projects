import React from "react";
// @ts-ignore
import classnames from 'classnames'
import { Board } from '../tetris/types'
import { Cell } from "../tetris/types";
import styles from  "./grid.module.scss"

interface Props {
  game: Board | undefined;
}

const Grid = (props: Props) => {
  const { game } = props;
  return (
    <div
      className={classnames(styles.grid)}
    >
      {game &&
        game.map((x:Cell[]) => {
          return x.map((cell: Cell) => {
            const { x, y } = cell.coordinate;
            const key = `${x}-${y}`;
            return (
              <div key={key} className={styles.cell}>{key}</div>
            );
          });
        })}
    </div>
  );
};

export default Grid;
