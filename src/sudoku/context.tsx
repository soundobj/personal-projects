import { shuffle} from 'lodash'
import React, { useReducer, useContext, ReactNode } from 'react';
import { MoveTypes, Move, Cell, ALLOWED_MISTAKES, GameLevel, Coordinate } from './definitions';
import { generateBoard, createGame, difficulty, createNumberDifficultyMap, VALID_NUMBERS } from './utils'

interface State {
  gameLevel?: GameLevel
  mistakes: number
  timeEllapsed?: string
  moves?: Move[] 
  editMode: MoveTypes
  selectedCell: Coordinate | undefined
  game?: Cell[][]
}

interface Action {
  type: Actions,
  payload?: any
}

export enum Actions {
  RECORD_MISTAKE,
  PAUSE_GAME,
  SET_EDIT_MODE,
  SET_SELECTED_CELL,
  START_GAME,
}

export const initialState: State = {
  mistakes: 0,
  editMode: MoveTypes.NUMBER,
  selectedCell: undefined
}

export const sudokuReducer = (state: State, action: Action ) => {
  switch (action.type) {
    case Actions.RECORD_MISTAKE: {
      console.error('@RECORD_MISTAKE', state.mistakes)
      if (state.mistakes === ALLOWED_MISTAKES) {
        console.error('@reducer RECORD_MISTAKE SHOW NEW GAME ALERT', )
      }
      return { ...state, mistakes: state.mistakes + 1 };
    }
    case Actions.START_GAME: {
      const gameLevel: GameLevel = action.payload
      console.error('@START_GAME', gameLevel)
      const board = generateBoard()
      const numberDifficultyMap = createNumberDifficultyMap(difficulty[gameLevel], shuffle(VALID_NUMBERS))
      return { ...state, gameLevel: action.payload, game: createGame(board, numberDifficultyMap) }
    }
    case Actions.SET_SELECTED_CELL: {
      console.error('@SET_SELECTED_CELL', action.payload)
      const coordinate: Coordinate = action.payload
      return { ...state, selectedCell: coordinate}
    }
    default: throw new Error(`Unexpected Sudoku reducer action ${action.type}`);
  }
};

// const SudokuContext = React.createContext(initialState);

// interface ProviderProps {
//   children: ReactNode
// }

// export const SudokuProvider = ({ children }: ProviderProps): JSX.Element => {
//   const contextValue = useReducer(sudokuReducer, initialState);
//   return (
//     //@ts-ignore
//     <SudokuContext.Provider value={contextValue}>
//       {children}
//     </SudokuContext.Provider>
//   );
// };

// export const useSudoku = () => useContext(SudokuContext)
