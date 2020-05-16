import React from "react";
// @ts-ignore
import classnames from 'classnames'

import { Cell as CellProps, Coordinate } from "../lib/definitions";
import { Transitions } from '../lib/reducer'

import Cell from "../cell/Cell";

interface Props {
  game: CellProps[][];
  selectCell: (coordinate: Coordinate) => void;
  isGamePaused: boolean,
  transition: Transitions
}

const Board = (props: Props) => {
  const { game, selectCell, isGamePaused, transition } = props;
  return (
    <div
      className={classnames("grid", {
        "game--paused": isGamePaused,
        "sudoku__game--over": transition === Transitions.GAME_OVER,
      })}
    >
      {game &&
        game.map((x: CellProps[], indexX: number) => {
          return x.map((y: CellProps, indexY: number) => {
            return (
              <Cell
                {...y}
                key={`x${indexX}y${indexY}`}
                selectCell={selectCell}
                transition={transition}
              />
            );
          });
        })}
    </div>
  );
};

export default Board;
