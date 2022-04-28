import React, { useState, useEffect } from 'react';
import { Direction, Shape, Tetrominoe } from './types';
import {
  randomEnum,
  createMatrix,
  moveShape,
  initShape,
  isShapeColliding,
  clearShape,
} from './lib/utils';
import Grid from './grid/Grid'
import stopWatch from "../stopWatch/stopWatch";
import { useTetrisStore } from './stores/tetrisStore';
import { COLUMNS, ROWS } from './consts';
import { clone, cloneDeep } from 'lodash';

const spawnPositionStub = undefined;

const Tetris = () => {
  const watch = stopWatch();
  // const board: number[][] = useTetrisStore((state: any) => state.board);
  // const setBoard = useTetrisStore((state: any) => state.setBoard);
  // const shape = useTetrisStore((state: any) => state.shape);
  // const setShape = useTetrisStore((state: any) => state.setShape);
  const [board, setBoard] = useState<number[][]>(createMatrix());
  const [shape, setShape] = useState<Shape>(initShape(Tetrominoe.I, board, spawnPositionStub));

  const [timeElapsed, setTimeElapsed] = useState(watch.getElapsedTime());
  watch.setCallback(setTimeElapsed);

  useEffect(() => {
    setBoard(board);
    watch.start();
    // const shape = initShape(randomEnum(Tetrominoe), board);
    setShape(shape);
    moveShape(board, shape);
  }, []); // eslint-disable-line

  useEffect(() => {
    const { elapsedTime } = timeElapsed;
    if (elapsedTime) {
      const testShape = cloneDeep(shape);
      testShape.position.y += 1;
      const nextBoard = clearShape(board, shape);
      const willShapeCollide = isShapeColliding(testShape, nextBoard);
      if (willShapeCollide) {
        if (shape.position.y === 0){
          console.log('game over');
          const { board: nextBoard, shape: nextShape } = moveShape(board, shape);
          setBoard(nextBoard);
          setShape(nextShape);
        } else {
          setShape(initShape(Tetrominoe.I, board, spawnPositionStub));  
        }
      
        return
      } else {
        const { board: nextBoard, shape: nextShape } = moveShape(board, shape, Direction.DOWN);
        setBoard(nextBoard);
        setShape(nextShape);
      }
    }
  }, [timeElapsed]); // eslint-disable-line

  return (
    <>
      <span>tetris</span>
      <Grid game={board} />
    </>);

};

export default Tetris;