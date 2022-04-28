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
import { useTetrisStore }  from './stores/tetrisStore';
import { COLUMNS, ROWS } from './consts';
import { clone, cloneDeep } from 'lodash';

const Tetris = () => {
  const watch = stopWatch();
  // const board: number[][] = useTetrisStore((state: any) => state.board);
  // const setBoard = useTetrisStore((state: any) => state.setBoard);
  // const shape = useTetrisStore((state: any) => state.shape);
  // const setShape = useTetrisStore((state: any) => state.setShape);
  const [board, setBoard] = useState<number[][]>(createMatrix());
  const [shape, setShape] = useState<Shape>(initShape(Tetrominoe.S, board, { y: 14, x: 4}));

  const [timeElapsed, setTimeElapsed] = useState(watch.getElapsedTime());
  watch.setCallback(setTimeElapsed);

  useEffect(() => {
    setBoard(board);
    watch.start();
    // const shape = initShape(randomEnum(Tetrominoe), board);
    // const shape = initShape(Tetrominoe.S, board);
    console.log('shape', shape);
    
    setShape(shape);
    moveShape(board, shape)
  }, []); // eslint-disable-line

  // board changes
  useEffect(() => {
    console.log('board changes');
  }, [board]); // eslint-disable-line

  useEffect(() => {
    const { elapsedTime } = timeElapsed;
    // place first piece
   if (elapsedTime > 1000) {
      const testShape = cloneDeep(shape);
      testShape.position.y += 1;
      const nextBoard = clearShape(board, shape);
      const willShapeCollide = isShapeColliding(testShape, nextBoard);
      if (willShapeCollide) {
        console.log('shape will collide');
        console.log('merge shape and create a new one')
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