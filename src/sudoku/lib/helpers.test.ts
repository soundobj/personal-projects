import { State } from "./reducer";
import { stopWatch } from "../../stopWatch/stopWatch";
import { handleGameLocalStorage } from "./helpers";

describe("handleGameLocalStorage", () => {
  const setItemMock = jest.fn();
  const removeItemMock = jest.fn();
  //@ts-ignore
  global.localStorage = {
    setItem: setItemMock,
    removeItem: removeItemMock,
  };
  it("removes currentGame related data if the game has ended", () => {
    const state = ({
      isGamePlayed: false,
      game: [[]],
    } as any) as State;

    const watch = stopWatch();
    handleGameLocalStorage(state, watch);
    expect(removeItemMock.mock.calls.length).toEqual(2);
    expect(setItemMock.mock.calls.length).toEqual(0);
    expect(removeItemMock.mock.calls[0]).toEqual(["SUDOKU_GAME_CURRENT_GAME"]);
    expect(removeItemMock.mock.calls[1]).toEqual([
      "SUDOKU_GAME_CURRENT_GAME_ELAPSED_TIME",
    ]);
    removeItemMock.mockRestore();
  });

  it("persists currentGame state if the game has ended", () => {
    const state = ({
      isGamePlayed: true,
      game: [[{ foo: "bar" }]],
    } as any) as State;

    const watch = stopWatch();
    watch.setElapsedSeconds(5000);
    handleGameLocalStorage(state, watch);
    expect(removeItemMock.mock.calls.length).toEqual(0);
    expect(setItemMock.mock.calls.length).toEqual(2);
    expect(setItemMock.mock.calls[0][0]).toEqual("SUDOKU_GAME_CURRENT_GAME");
    expect(JSON.parse(setItemMock.mock.calls[0][1])).toEqual(state);
    expect(setItemMock.mock.calls[1][0]).toEqual(
      "SUDOKU_GAME_CURRENT_GAME_ELAPSED_TIME"
    );
    expect(setItemMock.mock.calls[1][1]).toEqual("5000");
    setItemMock.mockRestore();
  });
});
