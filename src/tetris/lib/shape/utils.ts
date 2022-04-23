import { Coordinate } from "../../../sudoku/lib/definitions"
import { Direction, Shape, Board, Tetrominoe } from "../../types"

export const randomEnum = <T>(anEnum: T): T[keyof T] => {
  const enumValues = Object.keys(anEnum)
    .map(n => Number.parseInt(n))
    .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
  const randomIndex = Math.floor(Math.random() * enumValues.length)
  const randomEnumValue = enumValues[randomIndex]
  return randomEnumValue;
}

export const initShape = (shape: Shape, board: Board) => {

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

export const moveShape = (direction: Direction, shape: Shape, board: Board ) => {

}
