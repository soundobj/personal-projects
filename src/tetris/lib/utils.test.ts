import {
  createMatrix,
  initShape,
  moveShape,
  clearShape,
  isShapeColliding,
  rotateShape,
  rotateShapeInBounds,
  clearBoardCompletedRows,
} from "./utils";
import { Direction, Tetrominoe } from "../types";

describe("tetris utils", () => {
  describe('clearShape', () => {
    it('removes a shape from the board', () => {
      const board = [
        [0, 0, 2, 0, 0],
        [0, 0, 2, 0, 0],
        [0, 0, 2, 2, 0],
        [0, 0, 0, 0, 0],
        [0, 3, 0, 0, 0]
      ];
      const shape = {
        matrix: [
          [0, 2, 0],
          [0, 2, 0],
          [0, 2, 2],
        ],
        position: { x: 0, y: 1 }
      };

      const expected = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 3, 0, 0, 0]
      ]
      const actual = clearShape(board, shape);

      expect(actual).toMatchObject(expected);
    });
  });
  describe('moveShape', () => {
    it('places a new shape in the board', () => {
      const board = createMatrix(5, 5);
      const actual = moveShape(board, initShape(Tetrominoe.L, board));
      const expected = {
        board: [
          [0, 0, 2, 0, 0],
          [0, 0, 2, 0, 0],
          [0, 0, 2, 2, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0]
        ],
        shape: {
          matrix: [
            [0, 2, 0],
            [0, 2, 0],
            [0, 2, 2],
          ],
          position: { x: 0, y: 1 }
        },
      };
      expect(actual).toMatchObject(expected);
    });
    it('moves a shape on the board in a downwards direction', () => {
      const board = [
        [0, 0, 2, 0, 0],
        [0, 0, 2, 0, 0],
        [0, 0, 2, 2, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ];
      const shape = {
        matrix: [
          [0, 2, 0],
          [0, 2, 0],
          [0, 2, 2],
        ],
        position: { x: 0, y: 1 }
      };

      const expected = {
        board: [
          [0, 0, 0, 0, 0],
          [0, 0, 2, 0, 0],
          [0, 0, 2, 0, 0],
          [0, 0, 2, 2, 0],
          [0, 0, 0, 0, 0]
        ],
        shape: {
          matrix: [
            [0, 2, 0],
            [0, 2, 0],
            [0, 2, 2],
          ],
          position: { x: 1, y: 1 }
        }
      };
      const actual = moveShape(board, shape, Direction.DOWN);
      expect(actual).toMatchObject(expected);
    });
    it('moves a shape on the board in a clockwise direction', () => {
      const board = [
        [0, 0, 2, 0, 0],
        [0, 0, 2, 0, 0],
        [0, 0, 2, 2, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ];
      const shape = {
        matrix: [
          [0, 2, 0],
          [0, 2, 0],
          [0, 2, 2],
        ],
        position: { x: 0, y: 1 }
      };

      const expected = {
        board: [
          [0, 0, 0, 0, 0],
          [0, 2, 2, 2, 0],
          [0, 2, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0]
        ],
        shape: {
          matrix: [
            [0, 0, 0],
            [2, 2, 2],
            [2, 0, 0],
          ],
          position: { x: 0, y: 1 }
        }
      };
      const actual = moveShape(board, shape, Direction.CLOCKWISE);
      expect(actual).toMatchObject(expected);
    });
  });
  describe('isShapeColliding', () => {
    it('returns true if the shape is overlapping an existing tile', () => {
      const board = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ];
      const shape = {
        matrix: [
          [0, 2, 0],
          [0, 2, 0],
          [0, 2, 2],
        ],
        position: { x: 0, y: 1 }
      };
      expect(isShapeColliding(shape, board)).toBe(true);
    });
    it('returns true if the shape is off the grid', () => {
      const board = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ];
      const shape = {
        matrix: [
          [0, 0, 0],
          [2, 2, 2],
          [2, 0, 0],
        ],
        position: { x: 0, y: 3 }
      };
      expect(isShapeColliding(shape, board)).toBe(true);
    });
    it('returns true if the shape is off the bottom of the board', () => {
      const board = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ];
      const shape = {
        matrix: [
          [0, 2, 0],
          [0, 2, 0],
          [0, 2, 2],
        ],
        position: { x: 0, y: 3 }
      };
      expect(isShapeColliding(shape, board)).toBe(true);
    });
    it('returns false if the shape is not overlapping an existing tile', () => {
      const board = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0]
      ];
      const shape = {
        matrix: [
          [0, 2, 0],
          [0, 2, 0],
          [0, 2, 2],
        ],
        position: { x: 0, y: 1 }
      };
      expect(isShapeColliding(shape, board)).toBe(false);
    });
  });
  describe('rotateShape', () => {
    it('rotates shape clockwise', () => {
      const shape = [
        [0, 2, 0],
        [0, 2, 0],
        [0, 2, 2],
      ];
      const expected = [
        [0, 0, 0],
        [2, 2, 2],
        [2, 0, 0],
      ]
      const actual = rotateShape(shape, Direction.CLOCKWISE);
      expect(actual).toMatchObject(expected);
    });
    it('rotates shape anticlockwise', () => {
      const shape = [
        [0, 2, 0],
        [0, 2, 0],
        [0, 2, 2],
      ];
      const expected = [
        [0, 0, 2],
        [2, 2, 2],
        [0, 0, 0],
      ]
      const actual = rotateShape(shape, Direction.ANTI_CLOCKWISE);
      expect(actual).toMatchObject(expected);
    });
  });
  describe('rotateShapeInBounds', () => {
    it('rotates shape clockwise and maintains it in bounds clockwise', () => {
      const shape = {
        matrix: [
          [0, 2, 0],
          [0, 2, 0],
          [0, 2, 2],
        ],
        position: {
          x: 3,
          y: 0,
        }
      };
      const   board = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],

      ];

      const expected = {
          matrix: [
            [0, 0, 0],
            [2, 2, 2],
            [2, 0, 0],
          ],
          position: {
            x: 2,
            y: 0
          }
      };

      const actual = rotateShapeInBounds(Direction.CLOCKWISE, shape, board, );
      expect(actual).toMatchObject(expected);
    });
    it('rotates shape clockwise and maintains it in bounds anti-clockwise', () => {
      const shape = {
        matrix: [
          [0, 2, 0],
          [0, 2, 0],
          [0, 2, 2],
        ],
        position: {
          x: -1,
          y: 0,
        }
      };
      const   board = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],

      ];

      const expected = {
          matrix: [
            [0, 0, 2],
            [2, 2, 2],
            [0, 0, 0],
          ],
          position: {
            x: 0,
            y: 0
          }
      };

      const actual = rotateShapeInBounds(Direction.ANTI_CLOCKWISE, shape, board);
      console.log('actual', actual);
      
      expect(actual).toMatchObject(expected);
    });
  });
  describe('clearBoardCompletedRows', () => {
    it('clears rows that have been completed', () => {
      const board = [
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
        [1, 1, 0, 1, 1],
        [1, 1, 1, 1, 1]
      ];

      const shape = {
        matrix: [
          [0, 1, 1],
          [0, 1, 0],
          [0, 1, 0],
        ],
        position: {
          x: 1,
          y: 2
        }
      };

      const expected = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 0, 1, 1]
      ]
      const actual = clearBoardCompletedRows(board, shape);
      expect(actual).toMatchObject(expected);
    });
  });
});