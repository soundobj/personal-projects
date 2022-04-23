import React, { useState, useEffect } from 'react';
import { Board, Shape } from './types';
import { generateBoard } from './lib/shape/utils';
import Grid from '../grid/Grid'



const Tetris = () => {
  console.log('tetris');

  const [shape, setShape] = useState<Shape>();
  const [board, setBoard] = useState<Board>(generateBoard());

  // board changes
  useEffect(() => {
    console.log('board changes');
  }, [board]);

  return (
  <>
    <span>tetris</span>
    <Grid game={board} />
  </>);
  
};

export default Tetris;