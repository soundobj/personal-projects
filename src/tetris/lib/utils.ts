import { Move, Shape, Coordinate, Rotate, Game } from "../types";
import { ROWS, COLUMNS } from '../consts';
import cloneDeep from 'lodash/cloneDeep'

export const randomEnum = <T>(anEnum: T): T[keyof T] => {
  const enumValues = Object.keys(anEnum) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
}

export const createMatrix = (rows: number = ROWS, columns: number = COLUMNS): number[][] => {
  const matrix = [];
  while (rows--) {
    matrix.push(new Array(columns).fill(0));
  }
  return matrix;
}

export const getMatrixCentre = (matrix: number[][]): number => matrix[0].length / 2 | 0;

export const getShapeInitPosition = (matrix: number[][], shape: number[][]) => {
  const boardMiddle = getMatrixCentre(matrix);
  const shapeMiddle = getMatrixCentre(shape);
  return {
    x: 0,
    y: boardMiddle - shapeMiddle
  };
}

export const placeShape = (matrix: number[][], shape: number[][]): Game => {
  const board = cloneDeep(matrix);
  const position = getShapeInitPosition(board, shape);

  shape.forEach((row, x) => {
    row.forEach((value, y) => {
      if (value !== 0) {
        board[x + position.x][y + position.y] = value;
      }
    })
  });

  return {
    shape: {
      matrix: cloneDeep(shape),
      position,
    },
    board,
  };
};

export const clearShape = (board: number[][], shape: Shape) => {
  const { position } = shape;
  const nextBoard = cloneDeep(board);
  shape.matrix.forEach((row, x) => {
    row.forEach((value, y) => {
      if (value !== 0) {
        nextBoard[x + position.x][y + position.y] = 0;
      }
    });
  });
  return nextBoard;
}

export const moveShape = (matrix: number[][], shape: Shape, direction: Move = Move.DOWN) => {
  const nextBoard = clearShape(matrix, shape);
  const { position } = shape;
  const nextPosition: Coordinate = { x: 0, y: 0 };
  if (direction === Move.DOWN) {
    nextPosition.x = position.x + 1;
    nextPosition.y = position.y;
  }

  shape.matrix.forEach((row, x) => {
    row.forEach((value, y) => {
      if (value !== 0) {
        nextBoard[x + nextPosition.x][y + nextPosition.y] = value;
      }
    })
  });

  return {
    shape: {
      matrix: cloneDeep(shape.matrix),
      position: nextPosition,
    },
    board: nextBoard,
  };
}

export const isShapeColliding = (shape: Shape, board: number[][]): boolean => {
  const { matrix, position } = shape;
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
      if (
        matrix[y][x] !== 0
        && (board[x + position.x]
          && board[x + position.x][y + position.y]) !== 0
      ) {
        return true;
      }
    }
  }
  return false;
}

export const rotateShape = (matrix: number[][], direction: Rotate): number[][] => {
  const nextMatrix = cloneDeep(matrix);
  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0; x < y; ++x) {
      [
        nextMatrix[x][y],
        nextMatrix[y][x],
      ] = [
        nextMatrix[y][x],
        nextMatrix[x][y],
      ];
    }
  }

  return (direction === Rotate.CLOCKWISE)
    ? matrix.map(row => row.reverse())
    : matrix.reverse();
}

export const rotateShapeInBounds = (shape: Shape, board: number[][], direction: Rotate): Game => {

}
