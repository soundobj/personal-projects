export interface Coordinate {
  x: number;
  y: number;
}

export interface Cell { 
  coordinate: Coordinate,
  color?: TetrominoeColor,
  isFilled?: boolean,
}

export type Board = Cell[][];

export enum Direction {
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
  coordinates: Coordinate[],
  color: TetrominoeColor,
  kind: Tetrominoe,
  id?: number,
}
