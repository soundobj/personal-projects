import { StopWatch } from "../../stopWatch/stopWatch";
import { LOCAL_STORAGE_KEYS } from "./definitions";
import { State, Action, Actions } from "./reducer";

export const handleGameLocalStorage = (
  container: StateContainer,
  watch: StopWatch
) => () => {
  const state = container.get();
  if (state.isGamePlayed) {
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.CURRENT_GAME,
      JSON.stringify(state)
    );
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.CURRENT_GAME_ELAPSED_TIME,
      JSON.stringify(watch.getElapsedSeconds())
    );
  } else {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_GAME);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_GAME_ELAPSED_TIME);
  }
};

export const localStorageOnMount = (
  container: StateContainer, 
  watch: StopWatch,
  dispatch: (action: Action) => void
) => () => {
  window.addEventListener("beforeunload", handleGameLocalStorage(container, watch));
  const currentGame = localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_GAME);
  const currentGameElapsedTime = localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_GAME_ELAPSED_TIME);
  if (currentGame && currentGameElapsedTime) {
    dispatch({ type: Actions.LOAD_STORED_GAME, payload: JSON.parse(currentGame) });
    watch.setElapsedSeconds(JSON.parse(currentGameElapsedTime))
    watch.start()
  }
};

/**
    closure for getting fresh state from eventHandler
*/
interface StateContainer {
    get: () => State
    set: (state: State) => void
}
export const stateContainer = (): StateContainer => {
  let _state: State
  const get = (): State => _state;
  const set = (state: State) => {
    _state = state;
  };

  return {
    get,
    set,
  };
};
