import { StopWatch } from "../../stopWatch/stopWatch";
import { LOCAL_STORAGE_KEYS } from "./definitions";
import { State } from "./reducer";

export const handleGameLocalStorage = (state: State, watch: StopWatch) => {
  if (state.isGamePlayed) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_GAME, JSON.stringify(state))
      localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_GAME_ELAPSED_TIME, JSON.stringify(watch.getElapsedSeconds()))

  } else {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_GAME);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_GAME_ELAPSED_TIME);
  }
};

export const onUnload = (state: State, watch: StopWatch) => () => handleGameLocalStorage(state, watch)
