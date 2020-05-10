import React, { useReducer, useCallback, useState } from "react";
import { noop, isEmpty } from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoPlus } from "react-icons/go";
import { GiTrashCan } from "react-icons/gi";
import { FaPencilAlt } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { GrHelp } from "react-icons/gr";
import { BsController } from "react-icons/bs";
import { RiSunLine } from "react-icons/ri";

import StopWatchUI from "../stopWatch/StopWatchUI";
import stopWatch, { StopWatch } from "../stopWatch/stopWatch";

import { sudokuReducer, initialState, Actions, Dialogs } from "./lib/reducer";
import { GameLevel, Coordinate, MoveTypes } from "./lib/definitions";
import Board from "./board/Board";
import Numbers from "./numbers/Numbers";
import KeyboardInput from "./keyboadInput/KeyboardInput";
import Dialog, { DialogContent } from "./dialog/Dialog";
import NewGameOptions from "./newGameOptions/NewGameOptions";
import EndGameModal from "./endGameModal/EndGameModal";
import GameOverModal from "./gameOverModal/GameOverModal";
import GameCompletedModal from "./gameCompletedModal/GameCompletedModal";
import Mistakes, { MistakesTypes } from "./mistakes/Mistakes";
import CssFeatureDetect from "./cssFeatureDetect/CssFeatureDetect";
import MenuItem from "./menuItem/MenuItem";
import Icon from "./icon/Icon";
import "reset-css";
import "./vars.css";
import "./Sudoku.scss";

// dev only stubs
import * as stateStub from "./lib/stubs/state-stub.json";
// import * as stateStub from './stubs/almostComplete.json'

const watch = stopWatch();

export const handleWatchOnCloseModal = (
  stopWatch: StopWatch,
  isWatchRunning: boolean,
  pauseGame: (bool: boolean) => void
) => {
  if (isWatchRunning) {
    stopWatch.start()
    pauseGame(false)
  }
};

const Sudoku = () => {
  // @ts-ignore
  // const [state, dispatch] = useReducer(sudokuReducer, initialState)
  // @TODO: remove temp stub
  // @ts-ignore
  const [state, dispatch] = useReducer(sudokuReducer, stateStub.default);
  const [dialogShow, setDialogShow] = useState(false);
  const [isWatchRunning, setIsWatchRunning] = useState(false);

  const onHide = useCallback(() => {
    setDialogShow(false);
  }, []);

  const restartWatch = () => {
    watch.clear();
    watch.start();
    pauseGame(false);
  };

  const newGame = useCallback((gameLevel?: string) => {
    if (gameLevel && GameLevel.hasOwnProperty(gameLevel)) {
      startGame(gameLevel);
      restartWatch();
    }
  }, []);

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

  const restartGame = useCallback(() => {
    dispatch({ type: Actions.RESTART_GAME });
    restartWatch();
  }, []);

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

  const issueNumber = (number: number) => {
    dispatch({ type: Actions.ISSUE_NUMBER, payload: number });
    if (state.cellsToComplete === 1) {
      dispatch({
        type: Actions.SET_FINISHED_TIME,
        payload: watch.getElapsedTime(),
      });
    }
  };

  const undoMove = useCallback(() => dispatch({ type: Actions.UNDO_MOVE }), []);

  const pauseGame = useCallback(
    (payload: boolean) => dispatch({ type: Actions.PAUSE_GAME, payload }),
    []
  );

  const endGame = useCallback(() => dispatch({ type: Actions.END_GAME }), []);

  const showGameModal = useCallback(() => {
    setCurrentDialog("NEW_GAME");
    setDialogShow(true);
  }, []);

  const showEndGameModal = useCallback(() => {
    setCurrentDialog("END_GAME");
    setDialogShow(true);
  }, []);

  console.error("@state", state);
  const {
    game,
    selectedCell,
    cellsToComplete,
    moveHistory,
    isGamePlayed,
    finishedTime,
    editMode,
    isGamePaused,
    currentDialog,
    mistakes,
  } = state;
  const isCandidateMode = editMode === MoveTypes.CANDIDATE;

  const dialogs: Record<Dialogs, DialogContent> = {
    NEW_GAME: {
      header: "Choose difficulty",
      component: <NewGameOptions onHide={onHide} onNewGame={newGame} />,
    },
    END_GAME: {
      header: "Are you sure?",
      component: (
        <EndGameModal
          onHide={onHide}
          onCancelEndGame={() => { handleWatchOnCloseModal(watch, isWatchRunning, pauseGame) }}
          onConfirmEndGame={endGame}
        />
      ),
    },
    GAME_OVER: {
      header: "Game Over",
      component: (
        <GameOverModal
          onHide={onHide}
          onNewGame={newGame}
          onRestart={restartGame}
        />
      ),
    },
    GAME_FINISHED: {
      header: "Game Completed",
      component: (
        <GameCompletedModal
          onHide={onHide}
          onNewGame={newGame}
          finishedTime={finishedTime}
        />
      ),
    },
  };

  let showModal = false;
  if (
    currentDialog === "GAME_OVER" ||
    (currentDialog === "GAME_FINISHED" && !isGamePlayed)
  ) {
    // dont use setShowGameOver() to avoid re-rendering the component
    showModal = true;
  }

  const isUndoDisabled: boolean = isEmpty(moveHistory) || isGamePaused

  return (
    <>
      <CssFeatureDetect
        feature="grid"
        onDoesNotSupport={() => console.error("@does not support")}
        onDoesSupport={() => console.error("@does support")}
      />
      <section className="sudoku__container">
        <nav className="sudoku__nav__left">
          <MenuItem
            title="new"
            icon={<GoPlus className="icon__small" />}
            onClick={showGameModal}
          />
          <MenuItem
            title="help"
            icon={<GrHelp className="icon__smaller" />}
            onClick={noop}
          />
          <MenuItem
            title="keys"
            icon={<BsController className="icon__small" />}
            onClick={noop}
          />
        </nav>
        <nav className="sudoku__nav__right">
          <MenuItem
            title="end"
            icon={<GiTrashCan className="icon" />}
            onClick={showEndGameModal}
          />
          <MenuItem
            title="fails"
            icon={<Mistakes mistakes={mistakes} />}
            bgClass={MistakesTypes[mistakes]}
          />
          <MenuItem
            title="theme"
            icon={<RiSunLine className="icon__small" />}
            onClick={noop}
          />
        </nav>
        <article className="sudoku__game">
          <section className="sudoku__game__controls">
            <Icon
              tooltipPosition="top"
              title="Candidate mode"
              onClick={() => setEditMode(+!editMode)}
            >
              <div
                className={`${
                  isCandidateMode
                    ? "sudoku__game__controls__candidate--selected"
                    : "sudoku__game__controls__candidate"
                }`}
              >
                <FaPencilAlt />
              </div>
            </Icon>
            <StopWatchUI
              watch={watch}
              onPause={pauseGame}
              isGamePlayed={isGamePlayed}
              isGamePaused={isGamePaused}
            />
            <Icon
              tooltipPosition="top"
              className=""
              disabled={isUndoDisabled}
              title="Undo last move"
              onClick={undoMove}
            >
              <MdHistory className="sudoku__game__controls__option" />
            </Icon>
          </section>
          <section className="sudoku__game__board">
            <Board
              game={game}
              selectCell={isGamePlayed ? selectCell : noop}
              isGamePaused={isGamePaused}
            />
          </section>
          <section className="sudoku__game_footer">
            <Numbers issueNumber={issueNumber} isGamePlayed={isGamePlayed} />
          </section>
        </article>
      </section>
      <KeyboardInput
        isGamePlayed={isGamePlayed}
        game={game}
        selectedCell={selectedCell}
        cellsToComplete={cellsToComplete}
        editMode={editMode}
        setEditMode={setEditMode}
        resolveCell={resolveCell}
        selectCell={selectCell}
        issueNumber={issueNumber}
        pauseOrResumeGame={() => {
          pauseGame(!isGamePaused);
          if (isGamePaused) {
            watch.start();
          } else {
            watch.stop();
          }
        }}
        undoMove={!isUndoDisabled ? undoMove : noop}
      />
      <Dialog
        onEnter={() => {
          setIsWatchRunning(watch.getIsRunning());
          watch.stop();
          pauseGame(true);
        }}
        onEscapeKeyDown={() => {
          handleWatchOnCloseModal(watch, isWatchRunning, pauseGame);
          !isGamePlayed && setCurrentDialog("NEW_GAME");
        }}
        onHide={onHide}
        //@ts-ignore
        content={dialogs[currentDialog]}
        show={dialogShow || showModal}
      />
    </>
  );
};

export default Sudoku;
