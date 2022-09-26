export interface Coordinate {
  x: number;
  y: number;
}

export enum Direction {
  UP = "UP",
  LEFT = "LEFT",
  DOWN = "DOWN",
  RIGHT = "RIGHT",
  CLOCKWISE = "CLOCKWISE",
  ANTI_CLOCKWISE = "ANTI_CLOCKWISE",
  BOTTOM = "BOTTOM"
}

export enum Tetrominoe {
  I = "I",
  O = "O",
  J = "O",
  T = "T",
  L = "L",
  S = "S",
  Z = "Z"
}
export interface Shape {
  matrix: number[][],
  position: Coordinate;
}

export interface Game {
  board: number[][],
  shape: Shape,
}
