import React, { useState, useCallback } from "react";
import { Button, Modal } from "react-bootstrap";

import "./EndGame.css";

interface Props {
  onEndGame: (payload: boolean) => void;
  onConfirmEndGame: () => void;
}

interface EndGameModalProps {
  show: boolean
  onHide: () => void;
  onEndGame: (payload: boolean) => void;
  onConfirmEndGame: () => void;
}

const EndGameModal = React.memo((props: EndGameModalProps) => {
  const { show, onHide, onEndGame, onConfirmEndGame } = props;
  return (
    <Modal
      onHide={onHide}
      show={show}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onExit={() => {
        onEndGame(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">End Game</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you Sure?
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
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            onHide();
            onEndGame(false);
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

const EndGame = (props: Props) => {
  const { onEndGame, onConfirmEndGame } = props;
  const [modalShow, setModalShow] = useState(false);

  const onHide = useCallback(() => {
    setModalShow(false);
  }, []);
 
  return (
    <>
      <Button
        variant="primary"
        onClick={useCallback(() => {
          setModalShow(true);
          onEndGame(true)
        }, [])}
      >
        End Game
      </Button>
      <EndGameModal
        show={modalShow}
        onHide={onHide}
        onEndGame={onEndGame}
        onConfirmEndGame={onConfirmEndGame}
      />
    </>
  );
};

export default EndGame;
