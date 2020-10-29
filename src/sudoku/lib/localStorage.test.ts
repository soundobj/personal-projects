import { State, Actions } from "./reducer";
import { stopWatch } from "../../stopWatch/stopWatch";
import { handleGameLocalStorage, localStorageOnMount } from "./localStorage";
import { LOCAL_STORAGE_KEYS } from "./definitions";

describe("handleGameLocalStorage", () => {
  const setItemMock = jest.fn();
  const removeItemMock = jest.fn();
  const getMock = jest.fn();
  const container = {
    get: getMock
  } as any
  //@ts-ignore
  global.localStorage = {
    setItem: setItemMock,
    removeItem: removeItemMock,
  };
  it("returns a closure that when executed it removes currentGame related data if the game has ended", () => {
    const state = ({
      isGamePlayed: false,
      game: [[]],
    } as any) as State;

    getMock.mockReturnValue(state)

    const watch = stopWatch();
    const handler = handleGameLocalStorage(container, watch);
    handler();
    expect(removeItemMock.mock.calls.length).toEqual(2);
    expect(setItemMock.mock.calls.length).toEqual(0);
    expect(removeItemMock.mock.calls[0]).toEqual(["SUDOKU_GAME_CURRENT_GAME"]);
    expect(removeItemMock.mock.calls[1]).toEqual([
      "SUDOKU_GAME_CURRENT_GAME_ELAPSED_TIME",
    ]);
    removeItemMock.mockRestore();
    getMock.mockRestore();
  });

  it("returns a closure that when executed it persists currentGame state if the game has ended", () => {
    const state = ({
      isGamePlayed: true,
      game: [[{ foo: "bar" }]],
    } as any) as State;

    getMock.mockReturnValue(state)
    const watch = stopWatch();
    watch.setElapsedSeconds(5000);
    const handler = handleGameLocalStorage(container, watch);
    handler();
    expect(removeItemMock.mock.calls.length).toEqual(0);
    expect(setItemMock.mock.calls.length).toEqual(2);
    expect(setItemMock.mock.calls[0][0]).toEqual("SUDOKU_GAME_CURRENT_GAME");
    expect(JSON.parse(setItemMock.mock.calls[0][1])).toEqual(state);
    expect(setItemMock.mock.calls[1][0]).toEqual(
      "SUDOKU_GAME_CURRENT_GAME_ELAPSED_TIME"
    );
    expect(setItemMock.mock.calls[1][1]).toEqual("5000");
    setItemMock.mockRestore();
    getMock.mockRestore();
  });
});

describe("localStorageOnMount", () => {
  const addEventListenerMock = jest.fn();
  const getItemMock = jest.fn();
  const dispatchMock = jest.fn();
  const setElapsedSecondsMock = jest.fn();
  const startMock = jest.fn();
  const watch = {
    setElapsedSeconds: setElapsedSecondsMock,
    start: startMock,
  } as any;
  it("returns a closure that when executed attaches a beforeunload event, gets the localStorage for a current game and dispatches a LOAD_STORE_GAME action", () => {
    const gameState = {
      foo: "bar",
    };
    getItemMock
      .mockReturnValueOnce(JSON.stringify(gameState))
      .mockReturnValueOnce("9000");
    //@ts-ignore
    global.window = {
      addEventListener: addEventListenerMock,
    };
    //@ts-ignore
    localStorage = {
      getItem: getItemMock,
    };
    const handler = localStorageOnMount(jest.fn() as any, watch, dispatchMock);
    handler();
    expect(addEventListenerMock.mock.calls[0][0]).toEqual("beforeunload");
    expect(getItemMock.mock.calls[0][0]).toEqual(
      LOCAL_STORAGE_KEYS.CURRENT_GAME
    );
    expect(getItemMock.mock.calls[1][0]).toEqual(
      LOCAL_STORAGE_KEYS.CURRENT_GAME_ELAPSED_TIME
    );
    expect(dispatchMock.mock.calls[0][0]).toEqual({
      type: Actions.LOAD_STORED_GAME,
      payload: gameState,
    });
    expect(setElapsedSecondsMock.mock.calls[0][0]).toEqual(9000);
    expect(startMock.mock.calls.length).toEqual(1)
    addEventListenerMock.mockRestore();
    getItemMock.mockRestore();
    dispatchMock.mockRestore();
    setElapsedSecondsMock.mockRestore();
    startMock.mockRestore();
  });

  it("does not dispatch a LOAD_STORED_GAME action if not gameStateFound", () => {
    //@ts-ignore
    global.window = {
      addEventListener: addEventListenerMock,
    };
    //@ts-ignore
    localStorage = {
      getItem: getItemMock,
    };
    const handler = localStorageOnMount(jest.fn() as any, watch, dispatchMock);
    handler();
    expect(addEventListenerMock.mock.calls[0][0]).toEqual("beforeunload");
    expect(getItemMock.mock.calls[0][0]).toEqual(
      LOCAL_STORAGE_KEYS.CURRENT_GAME
    );
    expect(dispatchMock.mock.calls.length).toEqual(0);
    expect(setElapsedSecondsMock.mock.calls.length).toEqual(0);
    expect(startMock.mock.calls.length).toEqual(0)
    addEventListenerMock.mockRestore();
    getItemMock.mockRestore();
    dispatchMock.mockRestore();
    setElapsedSecondsMock.mockRestore();
  });
});
