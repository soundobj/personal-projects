import { generateBoard } from "./utils";

describe("tetris shape utils", () => {
  describe('generateBoard', () => {
    it('generates a 2 row x 3 column Board', () => {
      const expected = [
        [{ coordinate: {x: 0, y: 0}}],
        [{ coordinate: {x: 0, y: 1}}],
        [{ coordinate: {x: 0, y: 2}}],
        [{ coordinate: {x: 1, y: 0}}],
        [{ coordinate: {x: 1, y: 1}}],
        [{ coordinate: {x: 1, y: 2}}],
      ];
      const actual = generateBoard(2, 3);
      expect(expected).toMatchObject(actual);
    });
  });
});