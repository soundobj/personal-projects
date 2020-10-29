import React from "react";
import { StopWatchCallbackPayload } from "../../stopWatch/stopWatch";
import { ReactComponent as Completed } from "../../assets/completed.svg";

import "./GameCompletedModal.scss"
import { GameLevel } from "../lib/definitions";

interface Props {
  finishedTime: StopWatchCallbackPayload;
  gameLevel: GameLevel
}

const GameCompletedModal = (props: Props) => {
  let { finishedTime, gameLevel } = props;
  finishedTime = {
    ISOString: '0:23:57',
    elapsedTime: 23456
  }
  return (
    <article className="sudoku__modal__game-completed">
      <span className="sudoku__modal__game-completed__message">Congratulations!!</span>
      <span className="sudoku__modal__game-completed__difficulty">Difficulty</span>
      <span className="sudoku__modal__game-completed__game-level">{gameLevel}</span>
      <span className="sudoku__modal__game-completed__time">Time</span>
      <span className="sudoku__modal__game-completed__finished-time">{finishedTime.ISOString}</span>
      <div className="sudoku__modal__game-completed__icon">
        <Completed/>
      </div>
    </article>
  );
};

export default GameCompletedModal;
