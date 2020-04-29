import React from "react";
import { Button } from "react-bootstrap";

import "./EndGameModal.css";

interface Props {
  onEndGame: (payload: boolean) => void;
  onConfirmEndGame: () => void;
  onHide: () => void
}

export const EndGameModal= (
  props: Props
) => {
  const { onConfirmEndGame, onHide, onEndGame } = props;
  return (
    <>
      <span>Are you Sure?</span>
      <Button
        onClick={() => {
          onHide();
          onConfirmEndGame();
        }}
      >
        Yes
      </Button>
      <Button
        onClick={() => {
          onHide();
          onEndGame(false);
        }}
      >
        No
      </Button>
    </>
  );
};

export default EndGameModal
