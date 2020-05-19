import React from "react";
import { Button } from "react-bootstrap";
import NewGameOptions, {
  Props as NewGameProps,
} from "../newGameOptions/NewGameOptions";

import "./GameOverModal.scss";

interface Props extends NewGameProps {
  onRestart: () => void;
}

const GameOverModal = (props: Props) => {
  const { onHide, onNewGame, onRestart } = props;
  return (
    <>
      <span>Either</span>
      <Button
        className="sudoku__gameOver__modal__restart"
        variant="link"
        onClick={() => {
          onHide();
          onRestart();
        }}
      >Restart</Button>
      <span>Or choose a new game</span>
      <div className="sudoku__gameOver__modal__newGame__options">
        <NewGameOptions onHide={onHide} onNewGame={onNewGame} />
      </div>
    </>
  );
};

export default GameOverModal;
