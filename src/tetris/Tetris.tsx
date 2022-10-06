import React, { useState, useEffect, useRef } from 'react';
import { Direction, Shape, Tetrominoe } from './types';
import { useHotkeys } from 'react-hotkeys-hook';
import { Level as LevelEnum } from "./score/scoreUtis";

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
import GameOver from './gameOver/GameOver';

const Tetris = () => {
  const { watch, score, lastScore, scoreMessage, completedRowsCallback, level, resetLevel } = useScore();
  const [timeElapsed, setTimeElapsed] = useState(watch.getElapsedTime());
  watch.setCallback(setTimeElapsed);
  const [showGameOver, setShowGameOver] = useState<boolean>(false);

  let [boardUpdate, setBoardUpdate] = useState<number>(1);
  const boardRef = useRef<number[][]>(createMatrix());
  const shapeRef = useRef<Shape>(initShape(Tetrominoe.I, boardRef.current));

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
    'Space': () =>  updateBoard(Direction.BOTTOM),
  }

  useHotkeys('left,right,up,down,/,space', (key) => {
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
        updateBoard();
        setShowGameOver(true);
        watch.clear();
      } else {
        shapeRef.current = initShape(Tetrominoe.I, boardRef.current);
        setBoardUpdate(1);
        updateBoard();
      }
      return;
    }
    updateBoard(Direction.DOWN);
  }, [timeElapsed]);

  const onRestart = () => {
    setTimeout(() => {
      resetLevel();
      boardRef.current = createMatrix();
      shapeRef.current = initShape(Tetrominoe.I, boardRef.current)
      setShowGameOver(false);
      updateBoard();
    }, 400); // let moveitback animation play
  };

  return (
    <div className={styles.tetris}>
      <div className={styles.statsContainer}>
      <Score score={score} className={styles.score} lastScore={lastScore} scoreMessage={scoreMessage} />
      <Level level={level} onLevelChange={(newFontSize: number) => {
        const scoreElement: HTMLElement | null = document.querySelector(`.${styles.score}`);
        if (scoreElement) {
          scoreElement.style.fontSize = `${newFontSize}px`;
        }
      }}>
        <ProgressBar
          lastProgress={mapScoreToProgress(lastScore, level)}
          progress={mapScoreToProgress(score, level)}
          className={styles.levelProgress}
        />
      </Level>
      </div>
      { showGameOver && <GameOver onRestart={onRestart} /> }
      <Grid game={boardRef.current} />
    </div>);
};

export default Tetris;