import React from "react";
//@ts-ignore  @TODO: write missing typings for 3rd party dependency
import KeyboardEventHandler from "react-keyboard-event-handler";

import {
  VALID_NUMBERS,
  Direction,
  Cell,
  Coordinate,
  MoveTypes,
} from "../lib/definitions";
import { navigateBoard } from "../lib/board";
import {
  navigateBoardNextAvailableOverflow,
  navigateBoardNextAvailable,
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
  pauseOrResumeGame: () => void;
  undoMove: () => void;
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
    undoMove,
  } = props;

  const canMove = (direction: string) =>
    game && selectedCell && isValidMoveType(direction);

  const getDirection = (keyChord: string): Direction =>
    keyChord.substr(keyChord.indexOf("+") + 1).toUpperCase() as Direction;

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
        if (key.includes("alt")) {
          const direction = getDirection(key);
          if (canMove(direction) && cellsToComplete > 0) {
            selectCell(
              navigateBoardNextAvailableOverflow(
                game,
                selectedCell,
                Direction[direction]
              )
            );
          }
          return;
        }
        if (key === "u") {
          undoMove();
          return;
        }
        if (key === "space") {
          pauseOrResumeGame();
          return;
        }
        // Toggle between modes negating the current model boolean and converting into number using +
        if (key === "c") {
          setEditMode(+!editMode);
          return;
        }
        if (key === "s") {
          resolveCell();
          return;
        }
        if (VALID_NUMBERS.map(String).includes(key)) {
          issueNumber(parseInt(key, 10));
          return;
        }
        const direction = key.toUpperCase() as Direction;
        if (canMove(direction)) {
          selectCell(navigateBoard(game, selectedCell, Direction[direction]));
          return;
        } else if (isValidMoveType(direction)) {
          selectCell({ x: 0, y: 0 });
          return;
        }
      }}
    />
  );
};

export default KeyboardInput;
