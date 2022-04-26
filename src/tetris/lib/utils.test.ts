import {
  createMatrix,
  placeShape,
  moveShape,
  clearShape,
} from "./utils";
import { Move } from "../types";
import cloneDeep from 'lodash/cloneDeep';
import { L } from '../consts';

describe("tetris shape utils", () => {
  describe('placeShape', () => {
    it('places a shape in the board', () => {
      const l = cloneDeep(L);
      const board = createMatrix(5, 5);
      const actual = placeShape(board, l);
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
  });
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
    it('moves a shape from the board in a downwards direction', () => {
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
      const actual = moveShape(board, shape, Move.DOWN);
      expect(actual).toMatchObject(expected);
    });
  });
});