import { generateBoard, generateShape, placeShape } from "./utils";
import { Tetrominoe, Cell } from "../../types";
import flaten from 'lodash/flatten';

describe("tetris shape utils", () => {
  describe('generateBoard', () => {
    it('generates a 2 row x 3 column Board', () => {
      const expected = [
        [{ coordinate: {x: 0, y: 0}}, { coordinate: {x: 0, y: 1}}, { coordinate: {x: 0, y: 2}}],
        [{ coordinate: {x: 1, y: 0}}, { coordinate: {x: 1, y: 1}}, { coordinate: {x: 1, y: 2}}],
      ];
      const actual = generateBoard(2, 3);
      expect(expected).toMatchObject(actual);
    });
  });
  describe('placeShape', () => {
    it('places a shape in the board', () => {
      const board = generateBoard(5,10);
      const shape = generateShape(Tetrominoe.L)
      const nextBoard = placeShape(shape, board);

      shape.coordinates.forEach((coordinate) => {
        // sets correctly the color of the board cells
        const { x, y } = coordinate;
        expect(nextBoard[x][y].color).toBe(shape.color);

        /// only sets the required cells
        const cellsWithColor = flaten(nextBoard).filter((cell: Cell) => cell.color);
        expect(cellsWithColor.length).toBe(shape.coordinates.length);

        // its pure
        const origBoardCellsWithColor = flaten(board).filter((cell: Cell) => cell.color);
        expect(origBoardCellsWithColor.length).toBe(0);
      })
    });
  });
});