import {
  shuffle,
  isEqual,
  isEmpty,
  differenceWith,
  curryRight,
  curry,
  concat,
  cloneDeep,
} from "lodash";
import { pipe } from "lodash/fp";
import memoize from "fast-memoize";
import produce from "immer";

import { StopWatchCallbackPayload } from "../../stopWatch/stopWatch";

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
  NumberMapPayload,
  Transitions,
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
  getEnumValues,
} from "./utils";
import {
  getCell,
  filterOutCoordinate,
  cellIsAvailable,
  filterByCellCoordinate,
} from "./board";
import * as emptyGame from "./stubs/emptyGame.json";

export type Dialogs = "NEW_GAME" | "END_GAME" | "GAME_OVER" | "GAME_FINISHED";

export interface State {
  gameLevel?: GameLevel;
  mistakes: number;
  timeEllapsed?: string;
  moveHistory: Move[];
  editMode: MoveTypes;
  selectedCell: Coordinate;
  game: Cell[][];
  cellsToComplete: number;
  conflictingCells: Coordinate[];
  selectedCellRelatedCells: Coordinate[];
  numberMap: NumberMap;
  isGamePaused: boolean;
  isGamePlayed: boolean;
  restartGameNumberMap: NumberMap;
  restartCellsToComplete: number;
  restartGame: Cell[][];
  currentDialog: Dialogs;
  finishedTime: StopWatchCallbackPayload;
  level?: GameLevel;
  transition?: Transitions;
}

export interface Action {
  type: Actions;
  payload?: any;
}

export enum Actions {
  PAUSE_GAME,
  SET_EDIT_MODE,
  SELECT_CELL,
  START_GAME,
  ISSUE_NUMBER,
  RESOLVE_CELL,
  UNDO_MOVE,
  END_GAME,
  SET_FINISHED_TIME,
  RESTART_GAME,
  SET_CURRENT_DIALOG,
  LOAD_STORED_GAME,
  START_TRANSITION,
  TRANSITION_ENDED,
}

export const initialState: State = {
  mistakes: 0,
  editMode: MoveTypes.NUMBER,
  selectedCell: { x: 0, y: 0 },
  cellsToComplete: BOARD_SIZE,
  conflictingCells: [],
  selectedCellRelatedCells: [],
  game: [[]],
  numberMap: {},
  moveHistory: [],
  isGamePaused: false,
  isGamePlayed: false,
  restartGameNumberMap: {},
  restartCellsToComplete: BOARD_SIZE,
  restartGame: [[]],
  currentDialog: "NEW_GAME",
  finishedTime: { elapsedTime: 0, ISOString: "" },
};

const memGetRelatedCellsCoordinates = memoize(getRelatedCellsCoordinates);

export const sudokuReducer = (state: State, action: Action) => {
  switch (action.type) {
    case Actions.TRANSITION_ENDED: {
      console.error("@_TRANSITION_ENDED");
      return handleTransitionEnded(state);
    }
    case Actions.LOAD_STORED_GAME: {
      if (action.payload) {
        console.error("@_LOAD_STORED_GAME", action.payload);
        return action.payload;
      }
    }
    case Actions.SET_CURRENT_DIALOG: {
      const dialog: Dialogs = action.payload;
      return { ...state, currentDialog: dialog };
    }
    case Actions.START_GAME:
      return startGame(state, action.payload);
    case Actions.RESTART_GAME:
      return restartGame(state);
    case Actions.PAUSE_GAME: {
      return { ...state, isGamePaused: action.payload };
    }
    case Actions.END_GAME: {
      return { ...state, isGamePlayed: false };
    }
    case Actions.SET_FINISHED_TIME: {
      return { ...state, finishedTime: action.payload };
    }
    case Actions.SELECT_CELL: {
      if (isEqual(state.selectedCell, action.payload)) {
        return state;
      }
      return pipe(
        clearSameNumberHighlightedCells,
        clearConflictingCells,
        curryRight(setNewSelectedCell)(action),
        curryRight(setSelectedCellRelatedCells)(action),
        curryRight(highlightSameNumberCellsAsSelectedCell)(action)
      )(state);
    }
    case Actions.SET_EDIT_MODE: {
      const editMode: MoveTypes = action.payload;
      return { ...state, editMode };
    }
    case Actions.ISSUE_NUMBER: {
      return state.editMode === MoveTypes.NUMBER
        ? setCellValue(state, action.payload)
        : setCellCandidate(state, action.payload);
    }
    case Actions.UNDO_MOVE:
      return undoMove(state);
    case Actions.RESOLVE_CELL: {
      if (!process.env.REACT_APP_DEV_MODE) {
        return;
      }
      const { selectedCell, game } = state;
      const cell = getCell(selectedCell, game);
      return pipe(
        resolveCell,
        curryRight(recordMove)(MoveTypes.NUMBER, cell.solution)
      )(state);
    }
    default:
      throw new Error(`Unexpected Sudoku reducer action ${action.type}`);
  }
};

export const handleTransitionEnded = (state: State) => produce(state, (draft: State) => {
  switch (draft.transition) {
    case 'GAME_OVER': {
      draft.isGamePlayed = false;
      draft.currentDialog = "GAME_OVER";
      delete draft.transition
    }
  }
});

const restartGame = (state: State) =>
  produce(state, (draft: State) => {
    draft.cellsToComplete = draft.restartCellsToComplete;
    draft.numberMap = draft.restartGameNumberMap;
    draft.game = draft.restartGame;
    draft.isGamePlayed = true;
    draft.mistakes = 0;
    draft.selectedCellRelatedCells = [];
    draft.conflictingCells = [];
    delete draft.finishedTime;
  });

const undoCellInput = (state: State) =>
  produce(state, (draft: State) => {
    const { moveHistory, numberMap, game } = draft;
    const lastMove: Move = moveHistory[moveHistory.length - 1];
    const { coordinate } = lastMove;
    if (lastMove.isSolution === true) {
      // remove coordinates of lastMove from numberMap
      numberMap[lastMove.value].coordinates = numberMap[
        lastMove.value
      ].coordinates.filter(curry(filterOutCoordinate)(coordinate));
      draft.cellsToComplete++;
    }
    moveHistory.pop();
    const backwardsSearch = cloneDeep(moveHistory);
    const previousCellMove = backwardsSearch
      .reverse()
      .find(curry(filterByCellCoordinate)(coordinate));
    if (previousCellMove) {
      game[coordinate.x][coordinate.y].value = previousCellMove.value;
    } else {
      delete game[coordinate.x][coordinate.y].value;
    }
  });

const toggleCandidate = (
  game: Cell[][],
  numberMap: NumberMap,
  number: number,
  coordinate: Coordinate
): undefined => {
  const cell = getCell(coordinate, game);
  if (!cell.candidates) {
    return;
  }
  const candidatesMap = numberMap[number].candidates;
  numberMap[number].candidates = cell.candidates[number].entered
    ? candidatesMap.filter(curry(filterOutCoordinate)(coordinate))
    : concat(candidatesMap, [coordinate]);

  cell.candidates[number].entered = !cell.candidates[number].entered;
};

const undoCellCandidate = (state: State) =>
  produce(state, (draft: State) => {
    const { moveHistory, game, numberMap } = draft;
    const lastMove: Move = moveHistory[moveHistory.length - 1];
    toggleCandidate(game, numberMap, lastMove.value, lastMove.coordinate);
    moveHistory.pop();
  });

export const undoMove = (state: State) => {
  const { moveHistory } = state;
  if (isEmpty(moveHistory)) {
    return;
  }
  switch (moveHistory[moveHistory.length - 1].type) {
    case MoveTypes.NUMBER:
      return undoCellInput(state);
    case MoveTypes.CANDIDATE:
      return undoCellCandidate(state);
  }
};

export const recordMove = (state: State, type: MoveTypes, value: number) =>
  produce(state, (draft: State) => {
    const { moveHistory, selectedCell, game } = draft;
    const { x, y } = selectedCell;
    moveHistory.push({
      type,
      value,
      isSolution: game[x][y].solution === value,
      coordinate: selectedCell,
    });
  });

const setGameCellSameAsSelected = (
  c: Coordinate,
  game: Cell[][],
  type: MoveTypes,
  number: number
) => {
  return (game[c.x][c.y].sameAsSelected =
    type === MoveTypes.NUMBER
      ? { type: MoveTypes.NUMBER }
      : { type: MoveTypes.CANDIDATE, candidate: number });
};

const removeGameCellSameAsSelected = (c: Coordinate, game: Cell[][]) =>
  delete game[c.x][c.y].sameAsSelected;

const applyToListMinusCoordinate = (
  list: Coordinate[],
  c: Coordinate,
  handler: (c: Coordinate) => void
) =>
  list
    .filter(curry(filterOutCoordinate)(c))
    .forEach((coordinate: Coordinate) => handler(coordinate));

export const highlightSameNumberCellsAsSelectedCell = (
  state: State,
  action: Action
) =>
  produce(state, (draft: State) => {
    const { game, numberMap } = draft;
    const newCellToSelect = action.payload;
    const cell = getCell(newCellToSelect, game);
    if (cellIsAvailable(cell)) {
      return;
    }
    selectSameNumbers(game, cell, numberMap);
  });

const selectSameNumbers = (
  game: Cell[][],
  cell: Cell,
  numberMap: NumberMap
) => {
  getEnumValues(MoveTypes).forEach((move: number) => {
    applyToListMinusCoordinate(
      numberMap[cell.solution][getMoveTypePropertyMap(move)],
      cell.coordinate,
      curryRight(setGameCellSameAsSelected)(game, move, cell.solution)
    );
  });
};

export const highlightSameNumberCellsAsSolution = (
  state: State,
  number: number
) =>
  produce(state, (draft: State) => {
    const { game, selectedCell, numberMap } = draft;
    const cell = getCell(selectedCell, game);
    if (!isNumberSolution(number, cell)) {
      return;
    }
    selectSameNumbers(game, cell, numberMap);
  });

export const clearSameNumberHighlightedCells = (state: State) =>
  produce(state, (draft: State) => {
    const { game, numberMap, selectedCell } = draft;
    if (!selectedCell) {
      return;
    }
    const cell = getCell(selectedCell, game);
    if (cellIsAvailable(cell)) {
      return;
    }
    getEnumValues(MoveTypes).forEach((move: number) => {
      applyToListMinusCoordinate(
        numberMap[cell.solution][getMoveTypePropertyMap(move)],
        selectedCell,
        curryRight(removeGameCellSameAsSelected)(game)
      );
    });
  });

const getMoveTypePropertyMap = (
  type: MoveTypes
): "coordinates" | "candidates" => {
  switch (type) {
    case MoveTypes.NUMBER:
      return "coordinates";
    case MoveTypes.CANDIDATE:
      return "candidates";
  }
};

export const startGame = (state: State, level: GameLevel) =>
  produce(state, (draft: State) => {
    const board = generateBoard();
    const numberDifficultyMap: NumberMap = createNumberDifficultyMap(
      difficulty[level],
      shuffle(VALID_NUMBERS)
    );
    const { game, numberMap } = createGame({
      game: board,
      numberMap: numberDifficultyMap,
    });
    draft.cellsToComplete =
      BOARD_SIZE - countAutoGeneratedCells(numberDifficultyMap);
    draft.gameLevel = level;
    draft.game = game;
    draft.numberMap = numberMap;
    draft.isGamePlayed = true;
    delete draft.finishedTime;
    draft.mistakes = 0;
    // reset restart game clone
    draft.restartGameNumberMap = cloneDeep(numberMap);
    draft.restartCellsToComplete = draft.cellsToComplete;
    draft.restartGame = cloneDeep(game);
    draft.currentDialog = "NEW_GAME";
  });

export const resolveCell = (state: State) =>
  produce(state, (draft: State) => {
    const { game, selectedCell } = draft;
    const cell = getCell(selectedCell, game);
    if (cell.value !== cell.solution) {
      draft.cellsToComplete--;
      draft.numberMap[cell.solution].coordinates.push(selectedCell);
    }
    cell.value = cell.solution;
  });

export const setCellValue = (state: State, number: number) => {
  return pipe(
    curryRight(maybeGameOver)(number),
    curryRight(updateCellValue)(number),
    curryRight(removeConflictingCandidates)(number),
    curryRight(highlightSameNumberCellsAsSolution)(number),
    curryRight(recordMove)(MoveTypes.NUMBER, number),
    maybeFinishGame
  )(state);
};

export const isNumberSolution = (number: number, cell: Cell): boolean =>
  number === cell.solution;

export const maybeFinishGame = (state: State) =>
  produce(state, (draft: State) => {
    if (draft.cellsToComplete === 0) {
      draft.currentDialog = "GAME_FINISHED";
      draft.isGamePlayed = false;
    }
  });

export const maybeGameOver = (state: State, number: number) =>
  produce(state, (draft: State) => {
    const { game, selectedCell, mistakes } = draft;
    const cell = getCell(selectedCell, game);
    if (
      isNumberSolution(number, cell) ||
      (cell.value && cell.value === number)
    ) {
      return;
    }
    cell.value = number;
    if (mistakes + 1 > ALLOWED_MISTAKES - 1) {
      draft.transition = 'GAME_OVER'
    }
    draft.mistakes++;
  });

export const updateCellValue = (state: State, number: number) =>
  produce(state, (draft: State) => {
    const { game, selectedCell } = draft;
    const cell = getCell(selectedCell, game);
    cell.value = number;
    if (isNumberSolution(number, cell)) {
      draft.cellsToComplete--;
      draft.numberMap[number].coordinates.push(selectedCell);
    }
  });

export const removeConflictingCandidates = (state: State, number: number) =>
  produce(state, (draft: State) => {
    const { game, selectedCell } = draft;
    const cell = getCell(selectedCell, game);
    if (!isNumberSolution(number, cell)) {
      return;
    }
    const redundantCandidates = getRedundantCandidates(cell, game);
    redundantCandidates &&
      redundantCandidates.forEach((c: Coordinate) => {
        const boardCell = game[c.x][c.y];
        boardCell &&
          boardCell.candidates &&
          delete boardCell.candidates[cell.solution];
      });
  });

export const setSelectedCellRelatedCells = (
  state: State,
  action: Action
): State => {
  const newSelectedCell: Coordinate = action.payload;
  const newRelatedCells = memGetRelatedCellsCoordinates(
    newSelectedCell,
    state.game
  );
  return pipe(
    curryRight(removeUnrelatedCells)(newRelatedCells || []),
    curryRight(setRelatedCells)(newRelatedCells || [])
  )(state);
};

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
        (c: Coordinate) => (game[c.x][c.y].related = true)
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
  const { selectedCell, game } = state;
  if (getCell(selectedCell, game).value) {
    return state;
  }
  const conflicts = getConflicts(number, selectedCell, game);
  const maybeRecordMove = isEmpty(conflicts)
    ? curryRight(recordMove)(MoveTypes.CANDIDATE, number)
    : (state: State): State => state;
  return pipe(
    clearConflictingCells,
    curryRight(setCandidateConflicts)(conflicts),
    curryRight(setCandidate)(number, conflicts),
    maybeRecordMove
  )(state);
};

export const clearConflictingCells = (state: State) =>
  produce(state, (draft: State) => {
    const { game, conflictingCells } = draft;
    conflictingCells &&
      conflictingCells.forEach((c: Coordinate) => {
        delete game[c.x][c.y].conflicting;
      });
  });

export const setCandidateConflicts = (state: State, conflicts: Coordinate[]) =>
  produce(state, (draft: State) => {
    const { game } = draft;
    conflicts.forEach((c: Coordinate) => {
      game[c.x][c.y].conflicting = true;
    });
    draft.conflictingCells = conflicts;
  });

export const setCandidate = (
  state: State,
  number: number,
  conflicts: Coordinate[]
) =>
  produce(state, (draft: State) => {
    const { game, numberMap, selectedCell } = draft;
    const cell = getCell(selectedCell, game);

    if (!isEmpty(conflicts) || !cell) {
      return;
    }

    if (!cell.candidates) {
      cell.candidates = {};
    }

    // initial candidate input to cell
    if (cell.candidates && !cell.candidates[number]) {
      cell.candidates[number] = { entered: true, selected: false };
      numberMap[number].candidates.push(selectedCell);
    } else {
      // toggle on / off after initial input
      toggleCandidate(game, numberMap, number, selectedCell);
    }
  });

export const initialiseNumberMapEntry = (data: Partial<NumberMapPayload>) => {
  const { count, coordinates, candidates } = data;
  return {
    count: count || 0,
    coordinates: coordinates || [],
    candidates: candidates || [],
  };
};

export const setNewSelectedCell = (state: State, action: Action) =>
  produce(state, (draft: State) => {
    const { selectedCell, game } = draft;
    const newSelectedCell: Coordinate = action.payload;
    const { x: newX, y: newY } = newSelectedCell;
    if (selectedCell) {
      const { x: currentX, y: currentY } = selectedCell;
      delete game[currentX][currentY].selected;
    }
    game[newX][newY].selected = true;
    draft.selectedCell = game[newX][newY].coordinate;
  });
