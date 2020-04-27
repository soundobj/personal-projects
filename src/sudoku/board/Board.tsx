import React from "react";

import { Cell, Coordinate } from "../definitions";
import BoardCell from "../cell/Cell";

interface Props {
  game: Cell[][];
  selectCell: (coordinate: Coordinate) => void;
  isGamePaused: boolean
}

const Board = (props: Props) => {
  const { game, selectCell, isGamePaused } = props;
  return (
    <div className={`grid ${isGamePaused? 'game--paused' : ''}`}>
      {game &&
        game.map((x: Cell[], indexX: number) => {
          return x.map((y: Cell, indexY: number) => {
            return (
              <BoardCell
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
