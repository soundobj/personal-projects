import React from "react";
import { ReactComponent as Death } from "../../assets/death.svg";
import NewGameOptions, {
  Props as NewGameProps,
} from "../newGameOptions/NewGameOptions";

import "./GameOverModal.scss";

interface Props extends NewGameProps {
  onRestart: () => void;
}

export const GameOverHeader = () => (
  <div className="sudoku__dialog__game-over__header">
    <div className="sudoku__dialog__game-over__header__icon">
      <Death />
    </div>
    <span>Game Over</span>
  </div>
);

const GameOverModal = (props: Props) => {
  const { onHide, onNewGame, onRestart } = props;
  return (
    <>
      <span>Either</span>
      <button
        className="sudoku__gameOver__modal__restart"
        onClick={() => {
          onHide();
          onRestart();
        }}
      >Restart</button>
      <span>Or choose a new game</span>
      <div className="sudoku__gameOver__modal__newGame__options">
        <NewGameOptions onHide={onHide} onNewGame={onNewGame} />
      </div>
    </>
  );
};

export default GameOverModal;
