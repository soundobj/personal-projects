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

export interface Cell extends Coordinable {
  autogenerated: boolean;
  value?: number | undefined;
  solution: number;
  selected?: true;
  candidates?: CandidateMap
  conflicting?: true;
  related?: true;
}

export interface Move {
  coordinate: Coordinate
  value: number
  type: MoveTypes
}

export interface NumberMap {
  [key: number]: {
    count: number,
    coordinates: Coordinate[],
    candidates: Coordinate[]
  }
}
