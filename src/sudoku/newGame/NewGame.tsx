import React, { useState, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";

import { GameLevel } from "../definitions";

export interface NewGameModalProps {
  show: boolean;
  onHide: () => void;
  onNewGame: (gameLevel?: string) => void;
  onEnter: () => void;
  onEscapeKeyDown: () => void
}

export const NewGameLevelOptions = (
  props: Pick<NewGameModalProps, "onHide" | "onNewGame">
) => {
  const { onHide, onNewGame } = props;
  return (
    <ul>
      {Object.keys(GameLevel).map((item: string) => {
        return (
          <Button
            className="gameLevel__options"
            onClick={() => {
              onHide();
              onNewGame(item);
            }}
          >
            {item}
          </Button>
        );
      })}
    </ul>
  );
};

const NewGameModal = React.memo((props: NewGameModalProps) => {
  const { onHide, onNewGame, onEscapeKeyDown } = props;
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Choose difficulty
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewGameLevelOptions onHide={onHide} onNewGame={onNewGame} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.onHide();
            onEscapeKeyDown();
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

interface NewGameProps {
  onNewGame: () => void;
  onEnter: () => void;
  onEscapeKeyDown: () => void
}

const NewGame = (props: NewGameProps) => {
  const { onNewGame, onEnter, onEscapeKeyDown } = props;
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
        New Game
      </Button>
      <NewGameModal show={modalShow} onHide={onHide} onNewGame={onNewGame} onEnter={onEnter} onEscapeKeyDown={onEscapeKeyDown} />
    </>
  );
};

export default NewGame;
