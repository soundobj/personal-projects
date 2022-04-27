import { Coordinate, Tetrominoe } from "./types";

export const ROWS = 20;
export const COLUMNS = 10;
export const SHAPE_INIT_COORDS: Coordinate = {
  x: (COLUMNS / 2) - 1,
  y: 0
};

export const O = [
  [4, 4],
  [4, 4],
];

export const I = [
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
];

export const J = [
  [0, 3, 0],
  [0, 3, 0],
  [3, 3, 0],
];

export const L = [
  [0, 2, 0],
  [0, 2, 0],
  [0, 2, 2],
];

export const Z = [
  [5, 5, 0],
  [0, 5, 5],
  [0, 0, 0],
];

export const S = [
  [0, 6, 6],
  [6, 6, 0],
  [0, 0, 0],
];

export const T = [
  [0, 7, 0],
  [7, 7, 7],
  [0, 0, 0],
];

export const SHAPES = {
  [Tetrominoe.I]: I,
  [Tetrominoe.O]: O,
  [Tetrominoe.J]: J,
  [Tetrominoe.L]: L,
  [Tetrominoe.Z]: Z,
  [Tetrominoe.S]: S,
  [Tetrominoe.T]: T,
}




