import React, { useState, useCallback } from "react";
import { Button, Modal } from "react-bootstrap";

import "./EndGame.css";

interface Props {
  onEndGame: () => void;
}

interface EndGameModalProps {
  show: boolean
  onHide: () => void;
  onEndGame: () => void;
}

const EndGameModal = React.memo((props: EndGameModalProps) => {
  const { onHide, onEndGame } = props;
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">End Game</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you Sure?
        <Button onClick={() => {
          onHide()
          onEndGame()
        }}>Yes</Button>
        <Button onClick={() => onHide()}>No</Button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => onHide()}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
});

const EndGame = (props: Props) => {
  const { onEndGame } = props;
  const [modalShow, setModalShow] = useState(false);

  const onHide = useCallback(() => {
    setModalShow(false);
  }, []);
 
  return (
    <>
      <Button
        variant="primary"
        onClick={useCallback(() => setModalShow(true), [])}
      >
        End Game
      </Button>
      <EndGameModal show={modalShow} onHide={onHide} onEndGame={onEndGame} />
    </>
  );
};

export default EndGame;
