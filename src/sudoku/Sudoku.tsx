import React, { useReducer, useCallback, useState } from 'react'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import StopWatchUI from '../stopWatch/StopWatchUI'
import { stopWatch, CallbackPayload } from '../stopWatch/stopWatch'

import { sudokuReducer, initialState, Actions, Dialogs} from './reducer'
import { GameLevel, Coordinate, MoveTypes } from './definitions'
import EndGame from './endGame/EndGame'
import NewGame from './newGame/NewGame'
import UndoMove from './undoMove/UndoMove'
import Board from './board/Board'
import Numbers from './numbers/Numbers'
import EditMode from './editMode/EditMode'
import KeyboardInput from './keyboadInput/KeyboardInput'
import Dialog, { DialogContent } from './dialog/Dialog'
import { NewGameLevelOptions } from './newGame/NewGame'

// dev only
import * as stateStub from './state-stub.json'

import './vars.css'
import './Sudoku.css'

const watch = stopWatch()

export default () => {
  // @ts-ignore
  const [state, dispatch] = useReducer(sudokuReducer, initialState)
  // @TODO: remove temp stub
  // @ts-ignore
  // const [state, dispatch] = useReducer(sudokuReducer, stateStub.default)

  const [dialogShow, setDialogShow] = useState(false);

  const onHide = useCallback(() => {
    setDialogShow(false);
  }, []);
  
  const newGame = useCallback((gameLevel?: string) => {
    if (gameLevel && GameLevel.hasOwnProperty(gameLevel)) {
      startGame(gameLevel)
      watch.clear()
      watch.start()
      pauseGame(false)
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
  const setCurrentDialog = useCallback(
    (dialog: Dialogs) =>
      dispatch({ type: Actions.SET_CURRENT_DIALOG, payload: dialog }),
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
  const pauseGame = useCallback(
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
  const { game, selectedCell, cellsToComplete, moveHistory, isGamePlayed, gameElapsedTime, gameLevel, editMode, isGamePaused, currentDialog } = state

  const dialogs: Record<Dialogs, DialogContent> = {
    'NEW_GAME': {
      header: 'Choose difficulty',
      component: <NewGameLevelOptions onHide={onHide} onNewGame={newGame} />
    },
    'END_GAME': {
      header: 'Are you sure?',
      component: <NewGameLevelOptions onHide={onHide} onNewGame={newGame} />
    }
  }

  return (
    <>
      <Button
        onClick={useCallback(() => {
          setCurrentDialog('NEW_GAME')
          setDialogShow(true)
        }, [])}
      >
        New Game
      </Button>
      <Dialog
        onEnter={() => {
          watch.stop();
          pauseGame(true);
        }}
        onEscapeKeyDown={() => {
          isGamePlayed && watch.start();
          pauseGame(false);
        }}
        onHide={onHide}
        //@ts-ignore
        content={dialogs[currentDialog]}
        show={dialogShow}
      />
      <EditMode editMode={editMode} setEditMode={setEditMode} />
      <Numbers issueNumber={issueNumber} />
      <StopWatchUI
        watch={watch}
        onPause={pauseGame}
        isGamePlayed={isGamePlayed}
      />
      <EndGame onEndGame={pauseGame} onConfirmEndGame={endGame} />
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