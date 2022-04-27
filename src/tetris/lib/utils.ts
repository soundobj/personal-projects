import { Shape, Game, Direction, Tetrominoe } from "../types";
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
    x: 0,
    y: boardMiddle - shapeMiddle
  };
}

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

export const initShape = (type: Tetrominoe, board: number[][]): Shape => {
  const matrix = cloneDeep(SHAPES[type]);
  return {
    matrix,
    position: getShapeInitPosition(board, matrix)
  }
};

export const mapNumberToDirection = (number: number): Direction => (number > 0) ? Direction.LEFT : Direction.RIGHT;

export const moveShape = (matrix: number[][], shape: Shape, direction?: Direction) => {
  let nextBoard = matrix;
  if (direction) {
    // console.log('clearing shape');
    nextBoard = clearShape(matrix, shape);
  }
  console.table(nextBoard);

  const { position } = shape;
  let nextPosition = { ...position };

  switch (direction) {
    case Direction.DOWN:
      nextPosition.x = position.x + 1;
      nextPosition.y = position.y;
      break;
    case (Direction.CLOCKWISE || Direction.ANTI_CLOCKWISE):
      shape.matrix = rotateShape(shape.matrix, direction);
      break;
    default: {
      break;
    }
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
  console.log('isc', position);
  console.table(matrix);
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      
      // console.log('board exists y:', y + position.y, board[y + position.y] );

      if (
        matrix[y][x] !== 0
        && (board[y + position.y]
          && board[y + position.y][x + position.x]) !== 0
      ) {
        // console.log('failing pos x', (y + position.y), (x + position.x));
        
        return true;
      }
    }
  }
  console.log('isc false');
  
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

export const rotateShapeInBounds = (shape: Shape, board: number[][], direction: Direction): Game => {
  const originalShape = cloneDeep(shape);
  const originalBoard = cloneDeep(board);

  let offset = 0;

  shape.matrix = rotateShape(shape.matrix, direction); 
  while (isShapeColliding(shape, board)) {
    console.log('colliding');
    board = clearShape(board, originalShape);
    console.log('board after clear');
    console.table(board);
    
    
    shape.position.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    console.log('new offset', offset);
    
    if (offset > shape.matrix[0].length) {
      console.log('return orig');
      
      return {
        board: originalBoard,
        shape: originalShape,
      }
    }
  }

  console.log('done test', shape);
  

  return moveShape(board, shape);
}
