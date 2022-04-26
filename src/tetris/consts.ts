import { Coordinate, ShapeRotationOffsetTests } from "./types";

export const ROWS = 20;
export const COLUMNS = 10;
export const SHAPE_INIT_COORDS: Coordinate = {
  x: (COLUMNS / 2) - 1,
  y: 0
};

export const T_L_S_OFFSET_TEST: ShapeRotationOffsetTests = [
  [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
  [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
  [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: 2 }, { x: -1, y: 2 }],
];

export const I_OFFSET_TEST: ShapeRotationOffsetTests = [
  [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 2, y: 0 }, { x: -1, y: 0 }, { x: 2, y: 0 }],
  [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -2 }],
  [{ x: -1, y: 1 }, { x: 1, y: 1 }, { x: -2, y: 1 }, { x: 1, y: 0 }, { x: -2, y: 0 }],
  [{ x: 0, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: 0, y: 2 }],
];

export const L_POSITION_RELATIVE = [
  
]