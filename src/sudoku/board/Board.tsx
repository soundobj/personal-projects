import React from "react";

import { Cell as CellProps, Coordinate } from "../lib/definitions";
import Cell from "../cell/Cell";

interface Props {
  game: CellProps[][];
  selectCell: (coordinate: Coordinate) => void;
  isGamePaused: boolean
}

const Board = (props: Props) => {
  const { game, selectCell, isGamePaused } = props;
  return (
    <div className={`grid ${isGamePaused? 'game--paused' : ''}`}>
      {game &&
        game.map((x: CellProps[], indexX: number) => {
          return x.map((y: CellProps, indexY: number) => {
            return (
              <Cell
                {...y}
                key={`x${indexX}y${indexY}`}
                selectCell={selectCell}
              />
            );
          });
        })}
    </div>
  );
};

export default Board;
