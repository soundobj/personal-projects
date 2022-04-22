import React from "react";
// @ts-ignore
import classnames from 'classnames'

// import { Cell as CellProps, Coordinate, Transitions } from "../lib/definitions";
// import Cell from "../cell/Cell";
import "./grid.scss"

interface Props {
  game: any;
}

const Grid = (props: Props) => {
  // const { game } = props;
  const game = [
    [{ id: 0 }],
    [{ id: 1 }],
    [{ id: 2 }],
    [{ id: 3 }],
    [{ id: 4 }],
    [{ id: 5 }],
    [{ id: 6 }],
    [{ id: 7 }],
    [{ id: 8 }],
    [{ id: 9 }],
    [{ id: 10 }],
    [{ id: 11 }],
    [{ id: 12 }],
    [{ id: 13 }],
  ]

  return (
    <div
      className={classnames("grid1")}
    >
      {game &&
        game.map((x:any[], indexX: number) => {
          return x.map((y: any, indexY: number) => {
            return (
              <div className="cell">{y.id}</div>
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
