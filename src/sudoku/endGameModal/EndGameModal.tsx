import React from "react";
import { ReactComponent as EndGame } from "../../assets/man-run.svg";

import "./EndGameModal.scss";

interface Props {
  onCancelEndGame: () => void;
  onConfirmEndGame: () => void;
  onHide: () => void;
}

export const EndGameModal = (props: Props) => {
  const { onConfirmEndGame, onHide, onCancelEndGame } = props;
  return (
    <>
      <p className="sudoku__modal__endGame__message">Are you Sure?</p>
      <div className="sudoku__modal__endGame__icon">
        <EndGame />
      </div>
      <div className="sudoku__modal__endGame__options">
        <button
          className="sudoku__modal__endGame__options__button"
          onClick={() => {
            onHide();
            onConfirmEndGame();
          }}
        >
          Yes
        </button>
        <button
          className="sudoku__modal__endGame__options__button"
          onClick={() => {
            onHide();
            onCancelEndGame();
          }}
        >
          No
        </button>
      </div>
    </>
  );
};

export default EndGameModal;
