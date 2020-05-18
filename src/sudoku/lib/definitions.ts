export enum MoveTypes {
  CANDIDATE,
  NUMBER
}

export enum Direction {
  UP = "UP",
  LEFT = "LEFT",
  DOWN = "DOWN",
  RIGHT = "RIGHT" 
}

export enum GameLevel {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
  EXPERT = "EXPERT"
}

export const ALLOWED_MISTAKES = 3
export const BOARD_SIZE = 81
export const VALID_NUMBERS = [1,2,3,4,5,6,7,8,9]

export enum LOCAL_STORAGE_KEYS {
  STATS = "SUDOKU_GAME_STATS",
  CURRENT_GAME = "SUDOKU_GAME_CURRENT_GAME",
  CURRENT_GAME_ELAPSED_TIME = "SUDOKU_GAME_CURRENT_GAME_ELAPSED_TIME"
}

export type Transitions = 'GAME_OVER' | 'NEW_GAME' | 'GAME_FINISHED';

export const TransitionsIntervals: Record<Transitions, number> = {
  "GAME_OVER": 1000,
  "NEW_GAME": 2000,
  "GAME_FINISHED": 2000,
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface Coordinable {
  coordinate: Coordinate;
}

export interface CandidateMap {
  [key: number]: {
    entered: boolean,
    selected: boolean
  }
}

export type SameAsSelected = { type: MoveTypes, candidate?: number } 

export interface Cell extends Coordinable {
  autogenerated: boolean;
  solution: number;
  value?: number | undefined;
  selected?: true;
  candidates?: CandidateMap;
  conflicting?: true;
  related?: true;
  sameAsSelected?: SameAsSelected
}

export interface Move extends Coordinable {
  value: number
  isSolution?: boolean
  type: MoveTypes
}

export type NumberMapPayload = {
  count: number,
  coordinates: Coordinate[],
  candidates: Coordinate[]
}

/*
  this data structure needs commentary :)
*/
export interface NumberMap {
  [key: number]: NumberMapPayload
}
