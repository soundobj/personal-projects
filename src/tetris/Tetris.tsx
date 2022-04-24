import React, { useState, useEffect } from 'react';
import { Board, Shape, Tetrominoe } from './types';
import { generateBoard, randomEnum, generateShape } from './lib/shape/utils';
import Grid from '../grid/Grid'
import stopWatch from "../stopWatch/stopWatch";
import { useTetrisStore }  from './stores/tetrisStore';

const Tetris = () => {
  const watch = stopWatch();
  const board: Board = useTetrisStore((state: any) => state.board);
  const setBoard = useTetrisStore((state: any) => state.setBoard);
  const shape = useTetrisStore((state: any) => state.shape);
  const setShape = useTetrisStore((state: any) => state.setShape);

  const [timeElapsed, setTimeElapsed] = useState(watch.getElapsedTime());
  watch.setCallback(setTimeElapsed);

  useEffect(() => {
    const board = generateBoard();
    setBoard(board);
    watch.start();
  }, []); // eslint-disable-line

  // board changes
  useEffect(() => {
    console.log('board changes');
  }, [board]); // eslint-disable-line

  useEffect(() => {
    const { elapsedTime } = timeElapsed;
    // place first piece
    if (elapsedTime < 1000) {
      const shape = generateShape(randomEnum(Tetrominoe));
      console.log('start game', shape);
      setShape(shape);
    // move piece  
    } else if (elapsedTime > 1000) {
      console.log('move shape');
    }
  }, [timeElapsed]); // eslint-disable-line

  return (
  <>
    <span>tetris</span>
    <Grid game={board} />
  </>);
  
};

export default Tetris;