import React from "react";
//@ts-ignore  @TODO: write missing typings for 3rd party dependency
import KeyboardEventHandler from "react-keyboard-event-handler";

import { VALID_NUMBERS, Direction, Cell, Coordinate } from "../lib/definitions";
import { navigateBoard } from '../lib/board'
import {
  navigateBoardNextAvailableOverflow,
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
  pauseOrResumeGame: () => void
  undoMove: () => void
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
    pauseOrResumeGame,
    undoMove
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
        "u",
        "alt+left",
        "alt+up",
        "alt+down",
        "alt+right",
      ]}
      onKeyEvent={(key: string) => {
        if(key.includes("alt")) {
          const direction = key.substr(key.indexOf('+') + 1).toUpperCase() as Direction
          console.error('@_CMD', key, direction);
        }
        if (key === "u") {
          undoMove()
        }
        if (key === "space") {
          pauseOrResumeGame()
        }
        // Toggle between modes negating the current model boolean and converting into number using +
        if (key === "c") {
          setEditMode(+!editMode);
        }
        if (key === "s") {
          resolveCell();
        }
        const move = key.toUpperCase() as Direction;
        if (game && selectedCell) {
          isValidMoveType(move) &&
            selectCell(
              navigateBoard(
                game,
                selectedCell,
                Direction[move]
              )
            );
        } else {
          selectCell({ x: 0, y: 0 });
        }
        if (VALID_NUMBERS.map(String).includes(key)) {
          issueNumber(parseInt(key, 10));
        }
      }}
    />
  );
};

export default KeyboardInput;
