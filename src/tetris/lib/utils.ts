import { Shape, Direction, Tetrominoe, Coordinate } from "../types";
import { levelProps, Level } from "../score/scoreUtis";
import { ROWS, COLUMNS, SHAPES, tetrominoes } from '../consts';
import cloneDeep from 'lodash/cloneDeep'

export const getRandomArrayIndex = (array: any[]): number => Math.floor(Math.random() * array.length);

export const getRandomTetrominoe = (): Tetrominoe => {
  const randomIndex = getRandomArrayIndex(tetrominoes);  
  return Tetrominoe[tetrominoes[randomIndex] as keyof typeof Tetrominoe];
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
    x: boardMiddle - shapeMiddle,
  };
}

export const getTestShape = (shape: Shape, direction?: Direction, ) => {
  const testShape = cloneDeep(shape);
  if (direction === Direction.LEFT) {
    testShape.position.x += -1;
  } else if (direction === Direction.RIGHT) {
    testShape.position.x += 1;
  } else if (direction === Direction.DOWN) {
    testShape.position.y += 1;
  }
  return testShape;
};

export const clearShape = (board: number[][], shape: Shape) => {
  const { position } = shape;
  const nextBoard = cloneDeep(board);
  shape.matrix.forEach((column, y) => {
    column.forEach((row, x) => {
      if (row !== 0) {
        nextBoard[y + position.y][x + position.x] = 0;
      }
    });
  });
  return nextBoard;
}

export const initShape = (type: Tetrominoe, board: number[][], position?: Coordinate): Shape => {
  const matrix = cloneDeep(SHAPES[type]);
  return {
    matrix,
    position: position || getShapeInitPosition(board, matrix)
  }
};

export const mapNumberToDirection = (number: number): Direction => (number > 0) ? Direction.LEFT : Direction.RIGHT;

export const calculateBottomY = (board: number[][], shape: Shape) => {
  const nextShape = cloneDeep(shape);
  const nextBoard = clearShape(cloneDeep(board), shape);
  for (let index = 0; index < board.length; index++) {
    nextShape.position.y = index;    
    if (isShapeColliding(nextShape, nextBoard)) {
      break;
    }
  }
  return nextShape.position.y - 1;
}

export const moveShape = (matrix: number[][], shape: Shape, direction?: Direction) => {
  let nextBoard = matrix;
  if (direction) {
    nextBoard = clearShape(matrix, shape);
  }

  let nextRotatedShape: Shape;

  const { position } = shape;
  let nextPosition = { ...position };

  switch (direction) {
    case Direction.DOWN:
      nextPosition.x = position.x;
      nextPosition.y = position.y + 1;
      break;
    case Direction.BOTTOM:
      nextPosition.x = position.x;
      nextPosition.y = calculateBottomY(matrix, shape);
      break;
    case Direction.RIGHT:
      nextPosition.x = position.x + 1;
      nextPosition.y = position.y;
      break;
    case Direction.LEFT:
      nextPosition.x = position.x - 1;
      nextPosition.y = position.y;
      break;
    case (Direction.CLOCKWISE):
      nextRotatedShape = rotateShapeInBounds(direction, shape, matrix);
      nextPosition = nextRotatedShape.position;
      shape.matrix = nextRotatedShape.matrix;
      break;
    case (Direction.ANTI_CLOCKWISE):
      nextRotatedShape = rotateShapeInBounds(direction, shape, matrix);
      nextPosition = nextRotatedShape.position;
      shape.matrix = nextRotatedShape.matrix;
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
        matrix[y][x] !== 0 // if the shape unit cell is not empty
        && (board[y + position.y]
          && board[y + position.y][x + position.x]) !== 0
      ) {
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

export const rotateShapeInBounds = (direction: Direction, shape: Shape, board: number[][]) => {
  const { position, matrix } = shape;
  let xPos = position.x;
  let offset = 1;
  const nextMatrix = rotateShape(matrix, direction)
  const testShape = {
    position: cloneDeep(position),
    matrix: cloneDeep(nextMatrix),
  };
  while (isShapeColliding(testShape, board)) {
    xPos += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    testShape.position.x = xPos;
    if (offset > nextMatrix[0].length + 1) {
      return shape;
    }
  }
  return testShape;

};

export const isShapeCollidingDownwards = (board: number[][], shape: Shape): boolean => {
  const testShape = cloneDeep(shape);
  testShape.position.y += 1;
  return isShapeColliding(testShape, board);
};

export const clearBoardCompletedRows = (
  board: number[][],
  shape: Shape,
  callback?: (consecutiveCompletedRows: number) => void
): number[][] => {
  const nextBoard = cloneDeep(board);
  const shapeLength = shape.matrix.length;
  const shapePosY = shape.position.y;
  let consecutiveCompletedRows = 0

  for (var i = shapePosY; i < (shapePosY + shapeLength); i++) {
    if (nextBoard[i] && !nextBoard[i].includes(0)) {
      consecutiveCompletedRows++;
      for (var b = i -1; b >= 0; b--) {
        nextBoard[b + 1] = nextBoard[b];
        if (b === 0) {
          nextBoard[0] = nextBoard[b].map(x => 0);
        }
      }
    }
  }

  if (consecutiveCompletedRows && callback) {
    callback(consecutiveCompletedRows);
  }

  return nextBoard;
};

const getProgress = (unitsToGo: number, unitCount: number) : number => (unitCount - unitsToGo) / 10;

export const mapScoreToProgress = (score: number, level: Level): number => {
  const { nextLevelScoreThreshold, unitCount } = levelProps[level];
  
  const progressUnits = nextLevelScoreThreshold - score;
  return getProgress(progressUnits, unitCount);
}
