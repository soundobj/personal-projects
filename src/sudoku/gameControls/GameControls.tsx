import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdHistory } from "react-icons/md";

import { StopWatch } from "../../stopWatch/stopWatch";
import Icon from "../icon/Icon";
import StopWatchUI from "../../stopWatch/StopWatchUI";

import "./GameControls.scss"

interface Props {
  setEditMode: (mode: number) => void;
  editMode: number;
  watch: StopWatch;
  pauseGame: (mode: boolean) => void;
  isGamePlayed: boolean;
  isGamePaused: boolean;
  isUndoDisabled: boolean;
  isCandidateMode: boolean;
  undoMove: () => void;
}

const GameControls = (props: Props) => {
  const {
    setEditMode,
    editMode,
    watch,
    pauseGame,
    isGamePlayed,
    isGamePaused,
    isUndoDisabled,
    isCandidateMode,
    undoMove,
  } = props;
  return (
    <>
      <Icon
        tooltipPosition="bottom"
        title="Candidate mode"
        onClick={() => setEditMode(+!editMode)}
      >
        <div
          className={`${
            isCandidateMode
              ? "sudoku__game__controls__candidate--selected"
              : "sudoku__game__controls__candidate"
          }`}
        >
          <FaPencilAlt />
        </div>
      </Icon>
      <StopWatchUI
        watch={watch}
        onPause={pauseGame}
        isGamePlayed={isGamePlayed}
        isGamePaused={isGamePaused}
      />
      <Icon
        tooltipPosition="bottom"
        className=""
        disabled={isUndoDisabled}
        title="Undo last move"
        onClick={undoMove}
      >
        <div className="sudoku__game__controls__undo">
          <MdHistory className="sudoku__game__controls__option" />
        </div>
      </Icon>
    </>
  );
};

export default GameControls;
