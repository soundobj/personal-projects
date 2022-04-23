import React from "react";
// @ts-ignore
import classnames from 'classnames'

// import { Cell as CellProps, Coordinate, Transitions } from "../lib/definitions";
// import Cell from "../cell/Cell";
import styles from  "./grid.module.scss"

interface Props {
  game: any;
}

const Grid = (props: Props) => {
  const game = [...Array(200).keys()].map((x: number) => [{ id: x }] );

  return (
    <div
      className={classnames(styles.grid)}
    >
      {game &&
        game.map((x:any[], indexX: number) => {
          return x.map((y: any, indexY: number) => {
            return (
              <div className={styles.cell}>{y.id}</div>
              // <Cell
              //   {...y}
              //   key={`x${indexX}y${indexY}`}
              //   selectCell={selectCell}
              //   transition={transition}
              // />
            );
          });
        })}
    </div>
  );
};

export default Grid;
