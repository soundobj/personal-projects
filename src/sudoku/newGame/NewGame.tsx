import React, { useState, useCallback } from 'react'
import { Modal, Button } from 'react-bootstrap'

interface NewGameModalProps {
  show: boolean
  onHide: () => void
  onNewGame: (gameLevel?: string) => void
}

const NewGameModal = React.memo((props: NewGameModalProps) => {
  const {onHide, onNewGame} = props
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
        <ul>
          <li>
            <Button
              onClick={() => {
                onHide();
                onNewGame("EASY");
              }}
            >
              Easy
            </Button>
          </li>
          <li>
            <Button
              onClick={() => {
                onHide();
                onNewGame("MEDIUM");
              }}
            >
              Medium
            </Button>
          </li>
          <li>
            <Button
              onClick={() => {
                onHide();
                onNewGame("HARD");
              }}
            >
              Hard
            </Button>
          </li>
          <li>
            <Button
              onClick={() => {
                onHide();
                onNewGame("EXPERT");
              }}
            >
              Expert
            </Button>
          </li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.onHide()}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
})

interface NewGameProps {
  onNewGame: () => void
}

const NewGame = (props: NewGameProps) => {
  const { onNewGame } = props
  const [modalShow, setModalShow] = React.useState(false);

  const onHide = useCallback(() => {
    console.error("@hiding");
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
  <NewGameModal show={modalShow} onHide={onHide} onNewGame={onNewGame} />
  </>
  )
}

export default NewGame