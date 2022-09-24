import React, { useState, useEffect, useRef } from 'react';
import { Direction, Shape, Tetrominoe } from './types';
import { useHotkeys } from 'react-hotkeys-hook';

import {
  randomEnum,
  getTestShape,
  createMatrix,
  moveShape,
  initShape,
  clearShape,
  isShapeCollidingDownwards,
  isShapeColliding,
  clearBoardCompletedRows,
  mapScoreToProgress,
} from './lib/utils';
import Grid from './grid/Grid';
import Score from './score/Score';
import useScore from './score/useScore';
import ProgressBar from './progressBar/ProgressBar';
import Level from './level/Level';
import styles from './tetris.module.scss'

// const spawnPositionStub = { x: 4, y: 12};
const spawnPositionStub = undefined;

const Tetris = () => {
  const { watch, score, lastScore, scoreMessage, completedRowsCallback, level } = useScore();
  const [timeElapsed, setTimeElapsed] = useState(watch.getElapsedTime());
  watch.setCallback(setTimeElapsed);

  let [boardUpdate, setBoardUpdate] = useState<number>(1);
  const boardRef = useRef<number[][]>(createMatrix());
  const shapeRef = useRef<Shape>(initShape(Tetrominoe.I, boardRef.current, spawnPositionStub));

  const updateBoard = (direction?: Direction) => {
    const clearBoard = clearShape(boardRef.current, shapeRef.current);
    const testShape = getTestShape(shapeRef.current, direction);

    const { board: nextBoard, shape: nextShape } = isShapeColliding(testShape, clearBoard)
      ? moveShape(clearBoard, shapeRef.current)
      : moveShape(clearBoard, shapeRef.current, direction);

    boardRef.current = nextBoard;
    shapeRef.current = nextShape;
    setBoardUpdate(++boardUpdate);
  }

  const hotKeysMap: Record<string, () => void> = {
    'ArrowLeft': () => updateBoard(Direction.LEFT),
    'ArrowRight': () => updateBoard(Direction.RIGHT),
    'ArrowUp': () => updateBoard(Direction.CLOCKWISE),
    'ArrowDown': () => updateBoard(Direction.DOWN),
    'Slash': () => updateBoard(Direction.ANTI_CLOCKWISE),
  }

  useHotkeys('left,right,up,down,/', (key) => {
    // console.log('pressed something', key)
    hotKeysMap[key.code]();
  });

  useEffect(() => {
    watch.start();
    updateBoard();
  }, []);

  useEffect(() => {
    const { elapsedTime } = timeElapsed;
    if (!elapsedTime) {
      return;
    }

    const nextBoard = clearShape(boardRef.current, shapeRef.current);
    if (isShapeCollidingDownwards(nextBoard, shapeRef.current)) {
      boardRef.current = clearBoardCompletedRows(boardRef.current, shapeRef.current, completedRowsCallback);
      if (shapeRef.current.position.y === 0) {
        console.log('game over');
        updateBoard();
      } else {
        shapeRef.current = initShape(Tetrominoe.I, boardRef.current, spawnPositionStub);
        setBoardUpdate(1);
        updateBoard();
      }
      return;
    }
    updateBoard(Direction.DOWN);
  }, [timeElapsed]);

  return (
    <>
      <Score score={score} lastScore={lastScore} scoreMessage={scoreMessage} />
      <Level level="EASY">
        {/* @ts-ignore */}
        <ProgressBar
          lastProgress={mapScoreToProgress(lastScore, level)}
          progress={mapScoreToProgress(score, level)}
          className={styles.levelProgress}
        />
      </Level>
      <Grid game={boardRef.current} />
    </>);
};

export default Tetris;