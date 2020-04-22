import { cloneDeep } from 'lodash'
import * as reducer from './reducer'
import { Cell , Coordinate, NumberMap, MoveTypes } from './definitions'
import * as utilsTest from './utils.test'
import * as utils from './utils'

describe('sudoku/reducer',() => {
  describe('removeConflictingCandidates', () => {
    const game = [
      utilsTest.createBoardRow([9, 1, 2], 0, { 0: false, 1: false, 2: false }),
      utilsTest.createBoardRow([3, 4, 5], 1, { 0: false, 1: false, 2: false }),
      utilsTest.createBoardRow([6, 7, 8], 2, { 0: false, 1: false, 2: false }),
    ];
    const getRedundantCandidatesMock = jest.spyOn(utils, "getRedundantCandidates")
    it('returns a game without conflicting candidates', () => {
      getRedundantCandidatesMock.mockImplementationOnce(() => [{x:0, y: 0}])
      game[0][0].candidates = {
        3: { selected:false, entered: true },
        5: { selected:false, entered: true },
        7: { selected:false, entered: true },
      }
      const state = {
        selectedCell: { x: 1, y: 2 },
        game
      } as reducer.State
      const expected = reducer.removeConflictingCandidates(state, 5)
      // @ts-ignore mutations after effect
      delete state.game[0][0].candidates[5]
      expect(state).toStrictEqual(expected)
      getRedundantCandidatesMock.mockRestore();
    })
  })
  describe('removeUnrelatedCells',() => {
    it('clears out any old related cells that do not match the current related cells', () => {
      const board = [
        utilsTest.createBoardRow([5,8,3,1,9,6,2,4,7],0),
        utilsTest.createBoardRow([7,2,6,8,3,4,9,5,1],1),
        utilsTest.createBoardRow([1,4,9,7,2,5,6,3,8],2),
        utilsTest.createBoardRow([4,5,8,2,7,3,1,9,6],3),
        utilsTest.createBoardRow([6,9,7,5,1,8,3,2,4],4),
        utilsTest.createBoardRow([2,3,1,4,6,9,8,7,5],5),
        utilsTest.createBoardRow([3,1,4,9,8,7,5,6,2],6),
        utilsTest.createBoardRow([8,6,5,3,4,2,7,1,9],7),
        utilsTest.createBoardRow([9,7,2,6,5,1,4,8,3],8),
      ];
      const newRelatedCells = [
        {x: 0, y: 0},
        {x: 0, y: 1},
        {x: 0, y: 2},
        {x: 0, y: 3},
        {x: 0, y: 4},
        {x: 0, y: 5},
      ]
      const selectedCellRelatedCells = [
        {x: 0, y: 0},
        {x: 0, y: 1},
        {x: 0, y: 4},
        {x: 0, y: 5},
        {x: 1, y: 5},
        {x: 2, y: 5},
      ]
      board[0][0].related = true
      board[0][1].related = true
      board[0][4].related = true
      board[0][5].related = true
      board[1][5].related = true
      board[2][5].related = true

      const state = {
        game: board,
        selectedCellRelatedCells
      } as reducer.State

      const expected = reducer.removeUnrelatedCells(state, newRelatedCells)
      // mutations after effect
      delete state.game[1][5].related
      delete state.game[2][5].related
      expect(state).toStrictEqual(expected)
    })
  })
  describe('setRelatedCells',() => {
    it('clears out any old related cells that do not match the current related cells', () => {
      const board = [
        utilsTest.createBoardRow([5,8,3,1,9,6,2,4,7],0),
        utilsTest.createBoardRow([7,2,6,8,3,4,9,5,1],1),
        utilsTest.createBoardRow([1,4,9,7,2,5,6,3,8],2),
        utilsTest.createBoardRow([4,5,8,2,7,3,1,9,6],3),
        utilsTest.createBoardRow([6,9,7,5,1,8,3,2,4],4),
        utilsTest.createBoardRow([2,3,1,4,6,9,8,7,5],5),
        utilsTest.createBoardRow([3,1,4,9,8,7,5,6,2],6),
        utilsTest.createBoardRow([8,6,5,3,4,2,7,1,9],7),
        utilsTest.createBoardRow([9,7,2,6,5,1,4,8,3],8),
      ];
      const newRelatedCells = [
        {x: 0, y: 0},
        {x: 0, y: 1},
        {x: 0, y: 4},
        {x: 0, y: 5},
        // difference
        {x: 0, y: 2},
        {x: 0, y: 3},
      ]
      const selectedCellRelatedCells = [
        {x: 0, y: 0},
        {x: 0, y: 1},
        {x: 0, y: 4},
        {x: 0, y: 5},
        // difference
        {x: 1, y: 5},
        {x: 2, y: 5},
      ]

      const state = {
        game: board,
        selectedCellRelatedCells
      } as reducer.State

      const expected = reducer.setRelatedCells(state, newRelatedCells)
      // mutations after effect
      state.game[0][2].related = true
      state.game[0][3].related = true
      state.selectedCellRelatedCells = newRelatedCells
      expect(state).toStrictEqual(expected)
    })
    
    it('set the newRelated cells only as there is not difference between existing cells', () => {
      const board = [
        utilsTest.createBoardRow([5,8,3,1,9,6,2,4,7],0),
        utilsTest.createBoardRow([7,2,6,8,3,4,9,5,1],1),
        utilsTest.createBoardRow([1,4,9,7,2,5,6,3,8],2),
        utilsTest.createBoardRow([4,5,8,2,7,3,1,9,6],3),
        utilsTest.createBoardRow([6,9,7,5,1,8,3,2,4],4),
        utilsTest.createBoardRow([2,3,1,4,6,9,8,7,5],5),
        utilsTest.createBoardRow([3,1,4,9,8,7,5,6,2],6),
        utilsTest.createBoardRow([8,6,5,3,4,2,7,1,9],7),
        utilsTest.createBoardRow([9,7,2,6,5,1,4,8,3],8),
      ];

      const newRelatedCells = [
        {x: 0, y: 0},
        {x: 0, y: 1},
        {x: 0, y: 2},
        {x: 0, y: 3},
        {x: 0, y: 4},
        {x: 0, y: 5},
      ]

      const selectedCellRelatedCells: Coordinate[] = []
      const state = {
        game: board,
        selectedCellRelatedCells 
      } as reducer.State

      const expected = reducer.setRelatedCells(state, newRelatedCells)
      // mutations after effect
      state.selectedCellRelatedCells = newRelatedCells
      state.game[0][0].related = true
      state.game[0][1].related = true
      state.game[0][2].related = true
      state.game[0][3].related = true
      state.game[0][4].related = true
      state.game[0][5].related = true
      expect(state).toStrictEqual(expected)
    })
  })
  describe('addNumberToNumberMap',() => {
    it('adds a new coordinate to the number map', () => {
      const selectedCell = {x:0, y:0}
      const coordinates: Coordinate[] = []
      const candidates: Coordinate[] = []
      const numberMap: NumberMap = {
        3: {
          count: 2,
          coordinates,
          candidates,
        },
      };
      const state = {
        numberMap,
      } as reducer.State;
      const expected = reducer.addNumberToNumberMap(state, 3, selectedCell)
      state.numberMap[3].coordinates.push(selectedCell)
      expect(expected).toStrictEqual(state)
    })
  })
  describe('removeNumberFromNumberMap',() => {
    it('removes a coordinate from the number map', () => {
      const selectedCell = {x:0, y:0}
      const coordinates: Coordinate[] = [selectedCell]
      const candidates: Coordinate[] = []
      const numberMap: NumberMap = {
        3: {
          count: 2,
          coordinates,
          candidates,
        },
      };
      const state = {
        numberMap,
      } as reducer.State;
      const expected = reducer.removeNumberFromNumberMap(state, 3, selectedCell)
      // mutations after effect
      state.numberMap[3].coordinates = []
      expect(expected).toStrictEqual(state)
    })
  })
  describe('addCandidateToNumberMap',() => {
    it('adds a new candidate to the number map', () => {
      const selectedCell = {x:0, y:0}
      const coordinates: Coordinate[] = []
      const candidates: Coordinate[] = []
      const numberMap: NumberMap = {
        3: {
          count: 2,
          coordinates,
          candidates,
        },
      };
      const state = {
        numberMap,
      } as reducer.State;
      const expected = reducer.addCandidateToNumberMap(state, 3, selectedCell)
      state.numberMap[3].candidates.push(selectedCell)
      expect(expected).toStrictEqual(state)
    })
  })
  describe('removeCandidateToNumberMap',() => {
    it('removes a candidate from the number map', () => {
      const selectedCell = {x:0, y:0}
      const coordinates: Coordinate[] = []
      const candidates: Coordinate[] = [selectedCell]
      const numberMap: NumberMap = {
        3: {
          count: 2,
          coordinates,
          candidates,
        },
      };
      const state = {
        numberMap,
      } as reducer.State;
      const expected = reducer.removeCandidateToNumberMap(state, 3, selectedCell)
      // mutations after effect
      state.numberMap[3].candidates = []
      expect(expected).toStrictEqual(state)
    })
  })
  describe('setSameNumberAsSelectedCells',() => {
    it('sets sameAsSelected to true to all associated cells seen in the board by number or coordinate', () => {
      const game = [
        utilsTest.createBoardRow([9, 1, 2], 0, { 0: false, 1: true, 2: false }),
        utilsTest.createBoardRow([3, 4, 5], 1, { 0: false, 1: false, 2: false }),
        utilsTest.createBoardRow([6, 7, 8], 2, { 0: false, 1: false, 2: false }),
        utilsTest.createBoardRow([5, 6, 1], 3, { 0: false, 1: false, 2: true }),
        utilsTest.createBoardRow([8, 9, 6], 3, { 0: false, 1: false, 2: false }),
        utilsTest.createBoardRow([4, 9, 7], 3, { 0: false, 1: false, 2: false }),
        utilsTest.createBoardRow([1, 9, 4], 3, { 0: false, 1: false, 2: false }),
      ];
      const selectedCell = { x: 3, y: 2 }
      const action: reducer.Action = {
        type: reducer.Actions.SELECT_CELL,
        payload: selectedCell
      }
      game[6][0].candidates = {
        1: { selected:false, entered: true },
      }
      const numberMap: NumberMap = {
        1: {
          count: 2,
          coordinates: [{x:0, y:1}, selectedCell],
          candidates: [{x:6, y:0}]
        }
      }
      const state = {
        selectedCell,
        game,
        numberMap
      } as reducer.State
      const newState = cloneDeep(state)
      const expected = reducer.setSameNumberAsSelectedCells(state, action)
      // mutations after effect
      newState.game[0][1].sameAsSelected = { type: MoveTypes.NUMBER }
      newState.game[6][0].sameAsSelected = { type: MoveTypes.CANDIDATE,  candidate: 1}
      expect(newState).toStrictEqual(expected)
    })
  })
})