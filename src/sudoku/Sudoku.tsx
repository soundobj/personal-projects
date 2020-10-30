import React, { useReducer, useCallback, useState, useEffect } from "react";
import { noop, isEmpty } from "lodash";

import stopWatch from "../stopWatch/stopWatch";
import { sudokuReducer, initialState } from "./lib/reducer";
import {
  MoveTypes,
  Transitions,
  TransitionsIntervals,
  Dialogs,
} from "./lib/definitions";
import {
  localStorageOnMount,
  stateContainer,
  setUserTheme,
} from "./lib/localStorage";
import sudokuActions, { handleWatchOnCloseModal } from "./lib/actions";
import Board from "./board/Board";
import Numbers from "./numbers/Numbers";
import KeyboardInput from "./keyboadInput/KeyboardInput";
import Dialog, { DialogContent } from "./dialog/Dialog";
import NewGameOptions from "./newGameOptions/NewGameOptions";
import EndGameModal from "./endGameModal/EndGameModal";
import GameOverModal, { GameOverHeader } from "./gameOverModal/GameOverModal";
import GameCompletedModal from "./gameCompletedModal/GameCompletedModal";
import ShortcutsModal from "./shortcutsModal/ShortcutsModal";
import GameControls from "./gameControls/GameControls";
import CssFeatureDetect from "./cssFeatureDetect/CssFeatureDetect";
import Nav from "./nav/Nav";

import "bootstrap/dist/css/bootstrap.min.css";
import "reset-css";
import "./vars.scss";
import "./Sudoku.scss";

// import * as stateStub from "./lib/stubs/state-stub.json";
// import * as stateStub from './lib/stubs/almostComplete.json'

const watch = stopWatch();
const container = stateContainer();
const actions = sudokuActions();

const Sudoku = () => {
  // @ts-ignore
  const [state, dispatch] = useReducer(sudokuReducer, initialState);
  // @TODO: remove temp stub
  // @ts-ignore
  // const [state, dispatch] = useReducer(sudokuReducer, stateStub.default);

  actions.setDispatch(dispatch);
  actions.setState(state);
  actions.setWatch(watch);
  container.set(state);

  const [dialogShow, setDialogShow] = useState(false);
  const [isWatchRunning, setIsWatchRunning] = useState(false);

  const newGame = useCallback(actions.newGame, []);
  const selectCell = useCallback(actions.selectCell, []);
  const setEditMode = useCallback(actions.setEditMode, []);
  const transitionEnded = useCallback(actions.transitionEnded, []);
  const undoMove = useCallback(actions.undoMove, []);
  const pauseGame = useCallback(actions.pauseGame, []);
  const endGame = useCallback(actions.endGame, []);
  const setTheme = useCallback(actions.setTheme, []);

  const onHide = useCallback(() => {
    setDialogShow(false);
  }, []);

  const openModal = useCallback((dialog: Dialogs) => {
    actions.setCurrentDialog(dialog);
    setDialogShow(true);
  }, []);

  // console.error("@state", state);
  let {
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
    transition,
    gameLevel,
    numberMap,
    theme,
  } = state;

  setUserTheme();

  const isCandidateMode = editMode === MoveTypes.CANDIDATE;

  const dialogs: Record<Dialogs, DialogContent> = {
    NEW_GAME: {
      header: "Choose difficulty",
      component: <NewGameOptions onHide={onHide} onNewGame={newGame} />,
    },
    END_GAME: {
      header: "End Game",
      component: (
        <EndGameModal
          onHide={onHide}
          onCancelEndGame={() => {
            handleWatchOnCloseModal(watch, isWatchRunning, pauseGame);
          }}
          onConfirmEndGame={endGame}
        />
      ),
    },
    GAME_OVER: {
      header: <GameOverHeader />,
      component: (
        <GameOverModal
          onHide={onHide}
          onNewGame={newGame}
          onRestart={actions.restartGame}
        />
      ),
    },
    GAME_COMPLETED: {
      header: "Game Completed",
      CTALabel: "Close",
      component: (
        <GameCompletedModal gameLevel={gameLevel} finishedTime={finishedTime} />
      ),
    },
    SHORTCUTS: {
      header: "Keyboard Shortcuts",
      CTALabel: "Close",
      component: <ShortcutsModal />,
    },
    HELP: {
      header: "Help",
      CTALabel: "Close",
      component: <ShortcutsModal />,
    },
  };

  let shouldShowModal = false;
  if (
    currentDialog === "GAME_OVER" ||
    (currentDialog === "GAME_COMPLETED" && !isGamePlayed)
  ) {
    shouldShowModal = true; // dont use setShowGameOver() to avoid re-rendering the component
  }

  if (!isGamePlayed) {
    watch.clear();
    watch.stop();
  }

  if (transition) {
    const transitionInterval = TransitionsIntervals[transition as Transitions];
    setTimeout(() => {
      transitionEnded(transition);
      if (transition === "NEW_GAME") {
        watch.start();
      }
    }, transitionInterval);
  }

  const isUndoDisabled: boolean = isEmpty(moveHistory) || isGamePaused;

  useEffect(localStorageOnMount(container, watch, dispatch), []);

  return (
    <>
      <CssFeatureDetect
        feature="grid"
        onDoesNotSupport={() => console.error("@does not support")}
        onDoesSupport={() => console.error("@does support")}
      />
      <section className="sudoku__container">
        <Nav
          showEndGameModal={() => openModal("END_GAME")}
          showGameModal={() => openModal("NEW_GAME")}
          showShortcutsModal={() => openModal("SHORTCUTS")}
          mistakes={mistakes}
          isGamePlayed={isGamePlayed}
          theme={theme}
          setTheme={setTheme}
        />
        <article className="sudoku__game">
          <section className="sudoku__game__controls">
            <GameControls
              setEditMode={setEditMode}
              editMode={editMode}
              watch={watch}
              pauseGame={pauseGame}
              isGamePlayed={isGamePlayed}
              isGamePaused={isGamePaused}
              isUndoDisabled={isUndoDisabled}
              isCandidateMode={isCandidateMode}
              undoMove={undoMove}
            />
          </section>
          <section className="sudoku__game__board">
            <Board
              game={game}
              selectCell={isGamePlayed ? selectCell : noop}
              isGamePaused={isGamePaused}
              transition={transition}
            />
          </section>
          <section className="sudoku__game__footer">
            <Numbers
              issueNumber={actions.issueNumber}
              isGamePlayed={isGamePlayed}
              isGamePaused={isGamePaused}
              numberMap={numberMap}
            />
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
        resolveCell={actions.resolveCell}
        selectCell={selectCell}
        issueNumber={actions.issueNumber}
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
        hideCloseButton={currentDialog === "GAME_OVER"}
        onEnter={() => {
          setIsWatchRunning(watch.getIsRunning());
          watch.stop();
          pauseGame(true);
        }}
        onEscapeKeyDown={() => {
          if (currentDialog !== "GAME_OVER") {
            handleWatchOnCloseModal(watch, isWatchRunning, pauseGame);
            !isGamePlayed && actions.setCurrentDialog("NEW_GAME");
          }
        }}
        onHide={onHide}
        content={dialogs[currentDialog as Dialogs]}
        show={dialogShow || shouldShowModal}
      />
    </>
  );
};

export default Sudoku;
