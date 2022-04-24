import { Coordinate } from "../../../sudoku/lib/definitions";
import { Direction, Shape, Board, Tetrominoe, TetrominoeColor } from "../../types";
import { ROWS, COLUMNS } from '../../consts';

export const randomEnum = <T>(anEnum: T): T[keyof T] => {
  const enumValues = Object.keys(anEnum) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
}

export const getIshapeInitCoords = ():Coordinate[] => [
  {x: 4, y: 0},
  {x: 4, y: 1},
  {x: 4, y: 2},
  {x: 4, y: 3},
];

export const getOshapeInitCoords = ():Coordinate[] => [
  {x: 4, y: 0},
  {x: 5, y: 0},
  {x: 4, y: 1},
  {x: 5, y: 1},
];

export const getTshapeInitCoords = ():Coordinate[] => [
  {x: 4, y: 0},
  {x: 5, y: 0},
  {x: 6, y: 0},
  {x: 5, y: 1},
];

export const getLshapeInitCoords = ():Coordinate[] => [
  {x: 4, y: 0},
  {x: 4, y: 1},
  {x: 4, y: 2},
  {x: 4, y: 2},
];

export const getSshapeInitCoords = ():Coordinate[] => [
  {x: 4, y: 1},
  {x: 5, y: 1},
  {x: 5, y: 0},
  {x: 6, y: 0},
];

export const shapeInitCoordsMap = {
  I: getIshapeInitCoords(),
  O: getOshapeInitCoords(),
  T: getTshapeInitCoords(),
  L: getLshapeInitCoords(),
  S: getSshapeInitCoords(),
};

export const generateShape = (shape: Tetrominoe): Shape => ({
  coordinates: shapeInitCoordsMap[shape],
  color: TetrominoeColor[shape],
  kind: shape,
});

export const moveShape = (direction: Direction, shape: Shape, board: Board ) => {

}

export const placeShape = (shape: Shape, board: Board) => {

}

export const generateBoard = (rows: number = ROWS, columns: number = COLUMNS): Board => {
  const board = [];
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
      board.push([{ coordinate: { x, y }}]);
    }
  }
  return board;
}