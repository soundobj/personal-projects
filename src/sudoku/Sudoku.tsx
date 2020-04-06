import React, { useReducer, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
//@ts-ignore
import KeyboardEventHandler from 'react-keyboard-event-handler';

import { sudokuReducer, initialState, Actions} from './context'
import { GameLevel, Cell, Coordinate } from './definitions'
import BoardCell  from './cell/Cell'
import * as stateStub from './state-stub.json'
import './vars.css'
import './Sudoku.css'

interface NewGameModalProps {
  show: boolean
  onHide: (gameLevel?: string) => void
}

function NewGameModal(props: NewGameModalProps) {
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
          <li><Button onClick={() => props.onHide("EASY")}>Easy</Button></li>
          <li><Button onClick={() => props.onHide("MEDIUM")}>Medium</Button></li>
          <li><Button onClick={() => props.onHide("HARD")}>Hard</Button></li>
          <li><Button onClick={() => props.onHide("EXPERT")}>Expert</Button></li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.onHide()}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default () => {
  // const [state, dispatch] = useReducer(sudokuReducer, initialState)
  // @TODO: remove temp stub
  //@ts-ignore
  const [state, dispatch] = useReducer(sudokuReducer, stateStub.default)

  const [modalShow, setModalShow] = React.useState(false);
  const newGameOnHide = (gameLevel?: string) => {
    if (gameLevel && GameLevel.hasOwnProperty(gameLevel)) {
      dispatch({ type: Actions.START_GAME, payload: gameLevel})
    }
    setModalShow(false)
  }
  const setSelectedCell = (coordinate: Coordinate) => dispatch({ type: Actions.SET_SELECTED_CELL, payload: coordinate })
  console.error('@state', state)

  const { game } = state

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        New Game
      </Button>
      {state.gameLevel && (
        <div className="grid">
          {game &&
            game.map((x: Cell[], indexX) => {
              return x.map((y: Cell, indexY) => {
                return (
                  <BoardCell
                    {...y}
                    key={`x${indexX}y${indexY}`}
                    setSelectedCell={setSelectedCell}
                  />
                );
              });
            })}
        </div>
      )}
      <NewGameModal show={modalShow} onHide={newGameOnHide} />
      <KeyboardEventHandler
        handleKeys={[..."123456789".split(''), "c", "left", "right", "up", "down"]}
        onKeyEvent={(key: string) =>
          console.log(`do something upon keydown event of ${key}`)
        }
      />
    </>
  );
}