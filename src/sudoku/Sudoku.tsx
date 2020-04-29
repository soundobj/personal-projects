import React, { useReducer, useCallback } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import StopWatchUI from '../stopWatch/StopWatchUI'
import { stopWatch, CallbackPayload } from '../stopWatch/stopWatch'

import { sudokuReducer, initialState, Actions} from './reducer'
import { GameLevel, Coordinate, MoveTypes } from './definitions'
import EndGame from './endGame/EndGame'
import NewGame from './newGame/NewGame'
import UndoMove from './undoMove/UndoMove'
import Board from './board/Board'
import Numbers from './numbers/Numbers'
import EditMode from './editMode/EditMode'
import KeyboardInput from './keyboadInput/KeyboardInput'

// dev only
import * as stateStub from './state-stub.json'

import './vars.css'
import './Sudoku.css'

const watch = stopWatch()

export default () => {
  // const [state, dispatch] = useReducer(sudokuReducer, initialState)
  // @TODO: remove temp stub
  //@ts-ignore
  const [state, dispatch] = useReducer(sudokuReducer, stateStub.default)
  
  const newGame = useCallback((gameLevel?: string) => {
    if (gameLevel && GameLevel.hasOwnProperty(gameLevel)) {
      startGame(gameLevel)
      watch.clear()
      watch.start()
      haltGame(false)
    }
  }, [])

  const selectCell = useCallback(
    (coordinate: Coordinate) =>
      dispatch({ type: Actions.SELECT_CELL, payload: coordinate }),
    []
  );
  const startGame = useCallback(
    (gameLevel: string) =>
      dispatch({ type: Actions.START_GAME, payload: gameLevel }),
    []
  );
  const resolveCell = useCallback(
    () => dispatch({ type: Actions.RESOLVE_CELL }),
    []
  );
  const setEditMode = useCallback(
    (editMode: MoveTypes) =>
      dispatch({ type: Actions.SET_EDIT_MODE, payload: editMode }),
    []
  );
  const issueNumber = useCallback(
    (number: number) =>
      dispatch({ type: Actions.ISSUE_NUMBER, payload: number }),
    []
  );
  const undoMove = useCallback(
    () =>
      dispatch({ type: Actions.UNDO_MOVE }),
    []
  );

  const haltGame = useCallback(
    (payload: boolean) => dispatch({ type: Actions.PAUSE_GAME, payload }),
    []
  );
  const endGame = useCallback(() => dispatch({ type: Actions.END_GAME }), [])
  const getTimeToComplete = useCallback(
    (payload: any) =>
      dispatch({ type: Actions.SET_GAME_ELLAPSED_TIME, payload }),
    []
  );

  console.error('@state', state)
  const { game, selectedCell, cellsToComplete, moveHistory, isGamePlayed, gameElapsedTime, gameLevel, editMode, isGamePaused } = state

  return (
    <>
      <NewGame
        onNewGame={newGame}
        onEnter={() => {
          watch.stop();
          haltGame(true);
        }}
        onEscapeKeyDown={() => {
          watch.start();
          haltGame(false);
        }}
      />
      <EditMode editMode={editMode} setEditMode={setEditMode} />
      <Numbers issueNumber={issueNumber} />
      <StopWatchUI watch={watch} onPause={haltGame} />
      <EndGame onEndGame={haltGame} onConfirmEndGame={endGame} />
      <UndoMove moveHistory={moveHistory} undoMove={undoMove} />
      {gameLevel && (
        <Board
          game={game}
          selectCell={selectCell}
          isGamePaused={isGamePaused}
        />
      )}
      <KeyboardInput
        game={game}
        selectedCell={selectedCell}
        cellsToComplete={cellsToComplete}
        editMode={editMode}
        setEditMode={setEditMode}
        resolveCell={resolveCell}
        selectCell={selectCell}
        issueNumber={issueNumber}
      />
    </>
  );
}