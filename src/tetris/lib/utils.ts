import { Shape, Game, Direction, Tetrominoe, Coordinate } from "../types";
import { ROWS, COLUMNS, SHAPES } from '../consts';
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
    y: 0,
    x: boardMiddle - shapeMiddle
  };
}

export const clearShape = (board: number[][], shape: Shape) => {
  const { position } = shape;
  const nextBoard = cloneDeep(board);
  shape.matrix.forEach((column, y) => {
    column.forEach((row, x) => {
      if (row !== 0) {
        nextBoard[y + position.y][x+ position.x] = 0;
      }
    });
  });
  return nextBoard;
}

export const initShape = (type: Tetrominoe, board: number[][], position? : Coordinate): Shape => {
  const matrix = cloneDeep(SHAPES[type]);
  return {
    matrix,
    position: position || getShapeInitPosition(board, matrix)
  }
};

export const mapNumberToDirection = (number: number): Direction => (number > 0) ? Direction.LEFT : Direction.RIGHT;

export const moveShape = (matrix: number[][], shape: Shape, direction?: Direction) => {
  let nextBoard = matrix;
  if (direction) {
    nextBoard = clearShape(matrix, shape);
  }

  const { position } = shape;
  let nextPosition = { ...position };

  switch (direction) {
    case Direction.DOWN:
      nextPosition.x = position.x;
      nextPosition.y = position.y + 1;
      break;
    case Direction.RIGHT:
      nextPosition.x = position.x + 1;
      nextPosition.y = position.y;
      break;
    case Direction.LEFT:
      nextPosition.x = position.x -1;
      nextPosition.y = position.y;
      break;
    case (Direction.CLOCKWISE || Direction.ANTI_CLOCKWISE):
      shape.matrix = rotateShape(shape.matrix, direction);
      break;
    default: {
      break;
    }
  }

  shape.matrix.forEach((column, y) => {
    column.forEach((row, x) => {
      if (row !== 0) {
        nextBoard[y + nextPosition.y][x + nextPosition.x] = row;
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
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (
        matrix[y][x] !== 0
        && (board[y + position.y]
          && board[y + position.y][x + position.x]) !== 0
      ) {
        if (board[y + position.y]){
        console.log('culprit:', board[y + position.y][x + position.x]);
        } else {
          console.log('off the chart');
        }
        console.log('coords y x:', y + position.y, x + position.x);
        console.log('position', position);
        
        return true;
      }
    }
  }
  return false;
}

export const rotateShape = (matrix: number[][], direction: Direction): number[][] => {
  const nextMatrix = cloneDeep(matrix);
  for (let y = 0; y < nextMatrix.length; ++y) {
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

  return (direction === Direction.CLOCKWISE)
    ? nextMatrix.map(row => row.reverse())
    : nextMatrix.reverse();
}

export const cloneGame = (shape: Shape, board: number[][]) => ({
  shape: cloneDeep(shape),
  board: cloneDeep(board)
})

export const rotateShapeInBounds = (shape: Shape, board: number[][], direction: Direction): Game => {
  const origGame = cloneGame(shape, board);
  const isClockwise = direction === Direction.CLOCKWISE;
  const increment = isClockwise ? -1 : 1;
  shape.matrix = rotateShape(shape.matrix, direction); 
  while (isShapeColliding(shape, board)) {
    shape.position.y += increment;
    if (
      (isClockwise && shape.position.y === -1)
      || (!isClockwise && shape.position.y === board[0].length)
    ) {
      return origGame;
    }
  }
  return moveShape(board, shape);
}

export const isShapeCollidingDownwards = (board: number[][], shape: Shape) : boolean => {
  const testShape = cloneDeep(shape);
  testShape.position.y += 1;
  return isShapeColliding(testShape, board);
}
