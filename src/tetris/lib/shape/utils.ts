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

export const moveShape = (direction: Direction, shape: Shape, board: Board ) => {

}
