export interface Coordinate {
  x: number;
  y: number;
}

export enum Move {
  UP = "UP",
  LEFT = "LEFT",
  DOWN = "DOWN",
  RIGHT = "RIGHT" 
}

export enum Tetrominoe {
  I = "I",
  O = "O",
  T = "T",
  L = "L" ,
  S = "S" 
}

export enum TetrominoeColor {
  I = "#44FFFF",
  O = "#FFFF43",
  T = "#FF44FF",
  L = "#F8F9FA" ,
  S = "#44FF43" 
}
export interface Shape {
  matrix: number[][],
  position: Coordinate;
}

export interface Game {
  board: number[][],
  shape: Shape,
}

export enum Rotate {
  CLOCKWISE = "CLOCKWISE",
  ANTI_CLOCKWISE = "ANTI_CLOCKWISE"
}
