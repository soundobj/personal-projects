import React from "react";
//@ts-ignore  @TODO: write missing typings for 3rd party dependency
import KeyboardEventHandler from "react-keyboard-event-handler";

import { VALID_NUMBERS, Direction, Cell, Coordinate } from "../lib/definitions";
// import { navigateBoardNextAvailable as navigateBoard } from '../board'
import {
  navigateBoardNextAvailableOverflow as navigateBoard,
  isValidMoveType,
} from "../lib/board";

interface Props {
  editMode: number;
  setEditMode: (mode: number) => void;
  resolveCell: () => void;
  selectCell: (c: Coordinate) => void;
  issueNumber: (number: number) => void;
  game: Cell[][];
  selectedCell: Coordinate;
  cellsToComplete: number;
  isGamePlayed: boolean;
}

const KeyboardInput = (props: Props) => {
  const {
    editMode,
    setEditMode,
    resolveCell,
    game,
    selectedCell,
    cellsToComplete,
    selectCell,
    issueNumber,
    isGamePlayed,
  } = props;

  if (!isGamePlayed) {
    return null;
  }
  return (
    <KeyboardEventHandler
      handleKeys={[
        ...VALID_NUMBERS.map(String),
        "c",
        "s",
        "left",
        "right",
        "up",
        "down",
        "space",
      ]}
      onKeyEvent={(key: string) => {
        if ( key === "space") {
          console.error('@_doing pause',);
        }
        // Toggle between modes negating the current model boolean and converting into number using +
        if (key === "c") {
          setEditMode(+!editMode);
        }
        if (key === "s") {
          resolveCell();
        }
        const directions: string[] = Object.values(Direction);
        const move = key.toUpperCase();
        if (directions.includes(move)) {
          if (game && selectedCell) {
            isValidMoveType(move) &&
              selectCell(
                navigateBoard(
                  game,
                  selectedCell,
                  Direction[move],
                  cellsToComplete
                )
              );
          } else {
            // if the board is not selected upon navigation shortcut input select the first cell
            // @TODO select the first cell that is not filled in already.
            selectCell({ x: 0, y: 0 });
          }
        }
        if (VALID_NUMBERS.map(String).includes(key)) {
          issueNumber(parseInt(key, 10));
        }
      }}
    />
  );
};

export default KeyboardInput;
