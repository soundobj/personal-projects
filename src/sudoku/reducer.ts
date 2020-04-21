import { shuffle, isEqual, isEmpty, differenceWith, curryRight } from 'lodash'
import { pipe } from 'lodash/fp'
import memoize from 'fast-memoize'
import produce from 'immer'
import memoizeOne from 'memoize-one';

import {
  MoveTypes,
  Move,
  Cell,
  ALLOWED_MISTAKES,
  BOARD_SIZE,
  GameLevel,
  Coordinate,
  NumberMap,
  VALID_NUMBERS,
} from "./definitions";
import {
  generateBoard,
  createGame,
  difficulty,
  createNumberDifficultyMap,
  countAutoGeneratedCells,
  getConflicts,
  getRedundantCandidates,
  getRelatedCellsCoordinates,
} from "./utils";
import { getCell } from './board'

export interface State {
  gameLevel?: GameLevel
  mistakes: number
  timeEllapsed?: string
  moves?: Move[] 
  editMode: MoveTypes
  selectedCell: Coordinate
  game: Cell[][]
  cellsToComplete: number
  conflictingCells: Coordinate[]
  selectedCellRelatedCells: Coordinate[]
  numberMap: NumberMap 
}

export interface Action {
  type: Actions,
  payload?: any
}

export enum Actions {
  RECORD_MISTAKE,
  PAUSE_GAME,
  SET_EDIT_MODE,
  SELECT_CELL,
  START_GAME,
  ISSUE_NUMBER,
  RESOLVE_CELL,
}

export const initialState: State = {
  mistakes: 0,
  editMode: MoveTypes.NUMBER,
  selectedCell: {x: 0, y: 0},
  cellsToComplete: BOARD_SIZE,
  conflictingCells: [],
  selectedCellRelatedCells: [],
  game: [[]],
  numberMap: {}
}

const memGetRelatedCellsCoordinates = memoize(getRelatedCellsCoordinates)
const memGetConflictsOnce = memoizeOne(getConflicts)

export const sudokuReducer = (state: State, action: Action) => {
  switch (action.type) {
    case Actions.RECORD_MISTAKE: {
      console.error('@RECORD_MISTAKE', state.mistakes)
      if (state.mistakes === ALLOWED_MISTAKES) {
        console.error('@reducer RECORD_MISTAKE SHOW NEW GAME ALERT', )
      }
      return { ...state, mistakes: state.mistakes + 1 };
    }
    case Actions.START_GAME: return startGame(state, action.payload)
    case Actions.SELECT_CELL: {   
      if (isEqual(state.selectedCell, action.payload)) {
        return state;
      }
      return pipe(
        clearConflictingCells,
        curryRight(setNewSelectedCell)(action),
        curryRight(manageSelectedCellRelatedCells)(action),
      )(state)
    }
    case Actions.SET_EDIT_MODE: {
      const editMode: MoveTypes = action.payload
      return { ...state, editMode }
    }
    case Actions.ISSUE_NUMBER: {
      return state.editMode === MoveTypes.NUMBER
        ? setCellValue(state, action.payload)
        : setCellCandidate(state, action.payload);
    }
    case Actions.RESOLVE_CELL: {
      if (!process.env.REACT_APP_DEV_MODE) {
        return 
      }
      return resolveCell(state)
    }
    default: throw new Error(`Unexpected Sudoku reducer action ${action.type}`);
  }
};

export const addNumberToNumberMap = (state: State, number: number) => produce(state, (draft: State) => {
  // const num
})

export const removeNumberFromNumberMap = (state: State) => produce(state, (draft: State) => {

})

export const addCandidateToNumberMap = (state: State) => produce(state, (draft: State) => {

})

export const removeCandidateFromNumberMap = (state: State) => produce(state, (draft: State) => {

})

export const startGame = (state: State, level: GameLevel) => produce(state, (draft: State) => {
  const board = generateBoard()
  const numberDifficultyMap: NumberMap = createNumberDifficultyMap(difficulty[level], shuffle(VALID_NUMBERS))
  const { game, numberMap } = createGame({game:board, numberMap:numberDifficultyMap})
  draft.cellsToComplete = BOARD_SIZE - countAutoGeneratedCells(numberDifficultyMap)
  draft.gameLevel = level
  draft.game = game
  draft.numberMap = numberMap
})

export const resolveCell = (state: State) => produce(state, (draft: State) => {
  const { game, selectedCell } = draft; 
  const cell = getCell(selectedCell, game)
  if (cell.value !== cell.solution) {
    draft.cellsToComplete--;
  }
  cell.value = cell.solution;
})

export const setCellValue = (state: State, number: number) => {
  return pipe(
    curryRight(updateValueAndCellsToCompleteCount)(number),
    curryRight(removeConflictingCandidates)(number)
  )(state);
};

export const isNumberSolution = (number: number, cell: Cell): boolean => number === cell.solution

export const updateValueAndCellsToCompleteCount = (state: State, number: number) => produce(state, (draft: State) => {
  const { game, selectedCell } = draft
  const cell = getCell(selectedCell, game)
  cell.value = number;
  if (isNumberSolution(number, cell)) {
    draft.cellsToComplete--
  }
})

export const removeConflictingCandidates = (state: State, number: number) => produce(state, (draft: State) => {
  const { game, selectedCell } = draft
  const cell = getCell(selectedCell, game)
  if (!isNumberSolution(number, cell)) {
    return
  }    
  const redundantCandidates = getRedundantCandidates(cell, game)
  redundantCandidates && redundantCandidates.forEach((c: Coordinate) => {
    const boardCell = game[c.x][c.y]
    boardCell && boardCell.candidates && delete boardCell.candidates[cell.solution]
  }); 
})

export const manageSelectedCellRelatedCells = (state: State, action: Action): State => {
  const newSelectedCell: Coordinate = action.payload
  const newRelatedCells = memGetRelatedCellsCoordinates(newSelectedCell, state.game);
  return pipe(
    curryRight(removeUnrelatedCells)(newRelatedCells || []),
    curryRight(setRelatedCells)(newRelatedCells || []),
  )(state)
}

export const setRelatedCells = (state: State, newRelatedCells: Coordinate[]) =>
  produce(state, (draft: State) => {
    const { selectedCellRelatedCells, game } = draft;
    if (!selectedCellRelatedCells.length) {
      newRelatedCells.forEach((c: Coordinate) => {
        game[c.x][c.y].related = true;
      });
    } else {
      // do difference between new and existing
      const differentCells = differenceWith(
        newRelatedCells,
        selectedCellRelatedCells,
        isEqual
      );
      differentCells.forEach(
        (c: Coordinate) => game[c.x][c.y].related = true
      );
    }
    draft.selectedCellRelatedCells = newRelatedCells;
  });

export const removeUnrelatedCells = (
  state: State,
  newRelatedCells: Coordinate[]
) =>
  produce(state, (draft: State) => {
    const { selectedCellRelatedCells, game } = draft;
    const differentCells = differenceWith(
      selectedCellRelatedCells,
      newRelatedCells,
      isEqual
    );
    differentCells.forEach((c: Coordinate) => delete game[c.x][c.y].related);
  });

export const setCellCandidate = (state: State, number: number) => {
  const { selectedCell, game } = state
  if (getCell(selectedCell, game).value) {
    return state
  }
  return pipe(
    clearConflictingCells,
    curryRight(setCandidateConflicts)(number, selectedCell),
    curryRight(setCandidate)(number, selectedCell)
  )(state)
}

export const clearConflictingCells = (state: State) => produce(state, (draft: State) => {
  const { game, conflictingCells } = draft;
  conflictingCells &&
  conflictingCells.forEach((c: Coordinate) => {
    delete game[c.x][c.y].conflicting;
  });
})

export const setCandidateConflicts = (state: State, candidate: number, coordinate: Coordinate) => produce(state, (draft: State) => {
  const { game } = draft
  const candidateConflicts = memGetConflictsOnce(candidate, coordinate, game)
  if (candidateConflicts.length) {
    candidateConflicts.forEach((c: Coordinate) => {
      game[c.x][c.y].conflicting = true 
    })
    draft.conflictingCells = candidateConflicts
  }
})

export const setCandidate = (state: State, number: number, coordinate: Coordinate) => produce(state, (draft: State) => {
  const { game } = draft
  const candidateConflicts = memGetConflictsOnce(number, coordinate, game)
  if (isEmpty(candidateConflicts)) { 
    const cell = getCell(coordinate, game)
    if (!cell) {
      return
    }
    if (!cell.candidates) {
      cell.candidates = {};
    }
    if (cell.candidates && !cell.candidates[number]) {
      cell.candidates[number] = { entered: true, selected: false};
    } else if (cell.candidates && cell.candidates[number]) {
      cell.candidates[number].entered = !cell.candidates[number].entered;
    }
  }
})

export const setNewSelectedCell = (state: State, action: Action) => produce(state, (draft: State) => {
  const { selectedCell, game } = draft
  const newSelectedCell: Coordinate = action.payload
  const { x: newX, y: newY } = newSelectedCell;
  if (selectedCell) {
    const { x: currentX, y: currentY } = selectedCell;
    delete game[currentX][currentY].selected
  }
  game[newX][newY].selected = true
  draft.selectedCell = game[newX][newY].coordinate
})
