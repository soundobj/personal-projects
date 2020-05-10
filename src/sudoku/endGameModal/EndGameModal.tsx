import React from "react";
import { Button } from "react-bootstrap";

import "./EndGameModal.css";

interface Props {
  onCancelEndGame: () => void;
  onConfirmEndGame: () => void;
  onHide: () => void
}

export const EndGameModal= (
  props: Props
) => {
  const { onConfirmEndGame, onHide, onCancelEndGame } = props;
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
          onCancelEndGame();
        }}
      >
        No
      </Button>
    </>
  );
};

export default EndGameModal
