import {
  GameLevel,
  Coordinate,
  Dialogs,
  MoveTypes,
  Transitions,
  Themes,
} from "./definitions";
import { Actions, State } from "./reducer";
import { StopWatch } from "../../stopWatch/stopWatch";

type Dispatch = (...args: any[]) => void;

const sudokuActions = () => {
  let dispatch: Dispatch;
  let state: State;
  let watch: StopWatch;

  const setDispatch = (_dispatch: Dispatch) => (dispatch = _dispatch);
  const setState = (_state: State) => (state = _state);
  const setWatch = (_watch: StopWatch) => (watch = _watch);

  const startGame = (gameLevel: string) =>
    dispatch({ type: Actions.START_GAME, payload: gameLevel });
  const pauseGame = (payload: boolean) =>
    dispatch({ type: Actions.PAUSE_GAME, payload });

  const restartWatch = () => {
    watch.clear();
    watch.start();
    pauseGame(false);
  };

  const newGame = (gameLevel?: string) => {
    if (gameLevel && GameLevel.hasOwnProperty(gameLevel)) {
      startGame(gameLevel);
      restartWatch();
    }
  };

  const selectCell = (coordinate: Coordinate) =>
    dispatch({ type: Actions.SELECT_CELL, payload: coordinate });

  const restartGame = () => {
    dispatch({ type: Actions.RESTART_GAME });
    restartWatch();
    setCurrentDialog("NEW_GAME");
  };

  const setCurrentDialog = (dialog: Dialogs) =>
    dispatch({ type: Actions.SET_CURRENT_DIALOG, payload: dialog });

  const resolveCell = () => dispatch({ type: Actions.RESOLVE_CELL });

  const setEditMode = (editMode: MoveTypes) =>
    dispatch({ type: Actions.SET_EDIT_MODE, payload: editMode });

  const transitionEnded = (transition: Transitions) =>
    dispatch({ type: Actions.TRANSITION_ENDED, payload: transition });

  const issueNumber = (number: number) => {
    dispatch({ type: Actions.ISSUE_NUMBER, payload: number });
    if (state.cellsToComplete === 1) {
      dispatch({
        type: Actions.SET_FINISHED_TIME,
        payload: watch.getElapsedTime(),
      });
    }
  };

  const undoMove = () => dispatch({ type: Actions.UNDO_MOVE });
  const endGame = () => dispatch({ type: Actions.END_GAME });
  const setTheme = (theme: Themes) =>
    dispatch({ type: Actions.SET_THEME, payload: theme });

  return {
    setDispatch,
    setWatch,
    setState,
    startGame,
    pauseGame,
    newGame,
    restartWatch,
    selectCell,
    restartGame,
    setCurrentDialog,
    resolveCell,
    setEditMode,
    transitionEnded,
    issueNumber,
    undoMove,
    endGame,
    setTheme,
  };
};

export default sudokuActions;

export const handleWatchOnCloseModal = (
  stopWatch: StopWatch,
  isWatchRunning: boolean,
  pauseGame: (bool: boolean) => void
) => {
  if (isWatchRunning) {
    stopWatch.start();
    pauseGame(false);
  }
};
