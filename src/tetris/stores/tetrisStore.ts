import create, { StateCreator, SetState, GetState, StoreApi} from "zustand"
// import { immer } from "zustand/middleware/immer"
import { Shape } from "../types"

// type Middleware<S> = (
//   config: StateCreator<S>,
// ) => (set: SetState<S>, get: GetState<S>, api: StoreApi<S>) => S;

export interface TetrisState {
  shape: Shape | undefined,
  board: any | undefined,
  setBoard: (board: any) => void,
  setShape: (shape: Shape) => void,
}

export const useTetrisStore = create((set) => ({
  shape: undefined,
  setShape: (shape: Shape) => set((state: TetrisState) => ({ ...state, shape  })),
  board: undefined,
  setBoard: (board: any) => set((state: TetrisState) => ({ ...state, board  })),
}));