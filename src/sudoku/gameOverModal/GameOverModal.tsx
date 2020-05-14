import React from "react";
import { Button } from "react-bootstrap";
import { GiDeadHead } from "react-icons/gi";
import { GiBoneGnawer } from "react-icons/gi";
import { GiDisintegrate } from "react-icons/gi";
import { GiGrimReaper } from "react-icons/gi";
import NewGameOptions, {
  Props as NewGameProps,
} from "../newGameOptions/NewGameOptions";

interface Props extends NewGameProps {
  onRestart: () => void;
}

const GameOverModal = (props: Props) => {
  const { onHide, onNewGame, onRestart } = props;
  return (
    <>
      <span>You fucked up too many a time!!! <GiDeadHead /> <GiBoneGnawer /> <GiDisintegrate /> <GiGrimReaper /></span>
      <span>Either</span>
      <Button
        onClick={() => {
          onHide();
          onRestart();
        }}
      >
        Restart again the bitch
      </Button>
      <span>Or choose a new game</span>
      <NewGameOptions onHide={onHide} onNewGame={onNewGame} />
    </>
  );
};

export default GameOverModal
