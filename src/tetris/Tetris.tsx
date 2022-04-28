import React, { useState, useEffect } from 'react';
import { Direction, Shape, Tetrominoe } from './types';
import {
  randomEnum,
  createMatrix,
  moveShape,
  initShape,
  clearShape,
  isShapeCollidingDownwards,
} from './lib/utils';
import Grid from './grid/Grid'
import stopWatch from "../stopWatch/stopWatch";
import { COLUMNS, ROWS } from './consts';
import { clone, cloneDeep } from 'lodash';

const spawnPositionStub = undefined;

const Tetris = () => {
  const watch = stopWatch();
  const [board, setBoard] = useState<number[][]>(createMatrix());
  const [shape, setShape] = useState<Shape>(initShape(Tetrominoe.I, board, spawnPositionStub));

  const [timeElapsed, setTimeElapsed] = useState(watch.getElapsedTime());
  watch.setCallback(setTimeElapsed);

  const updateBoard = (direction?: Direction) => {
    const { board: nextBoard, shape: nextShape } = moveShape(board, shape, direction);
    setBoard(nextBoard);
    setShape(nextShape);
  }

  useEffect(() => {
    watch.start();
    updateBoard();
  }, []); // eslint-disable-line

  useEffect(() => {
    const { elapsedTime } = timeElapsed;

    if (!elapsedTime) {
      return
    }

    const nextBoard = clearShape(board, shape);
    if (isShapeCollidingDownwards(nextBoard, shape)) {
      if (shape.position.y === 0) {
        console.log('game over');
        updateBoard();
      } else {
        setShape(initShape(Tetrominoe.I, board, spawnPositionStub));
      }
      return;
    }
  
    updateBoard(Direction.DOWN);
  }, [timeElapsed]); // eslint-disable-line

  return (
    <>
      <span>tetris</span>
      <Grid game={board} />
    </>);
};

export default Tetris;