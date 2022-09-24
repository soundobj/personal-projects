import React, { useRef, useEffect, useState } from 'react';

import styles from "./progressBar.module.scss"
import classNames from 'classnames';
import { createSpringAnimation } from '../lib/springAnimation/springAnimation';

const ProgressBar = (props: ProgressBar) => {

  const { className, lastProgress, progress } = props;
  const progressRef = useRef();
  const springRef = useRef();
  const [progressWidth, setProgressWidth] = useState(0);


  useEffect(() => {
    const progressKeyframes = new KeyframeEffect(
      // @ts-ignore
      progressRef.current,
      [
        { transform: `scaleX(${lastProgress})` },
        { transform: `scaleX(${progress})` }
      ],
      { duration: 200, fill: 'forwards', easing: 'ease-in' }
    );

    const progressAnimation = new Animation(progressKeyframes, document.timeline);

    progressAnimation.play();

    const onFinished = progressAnimation.finished;

    onFinished.then(() => {
      setProgressWidth(progress * 10);
      setTimeout(() => {
        const { positions, frames } = createSpringAnimation(20, 0);
        const keyframes = new KeyframeEffect(
          // @ts-ignore
          springRef.current, positions, {
          duration: (frames / 60) * 400,
          fill: "both",
          easing: "linear",
          iterations: 1
        });

        const springAnimation = new Animation(keyframes);
        springAnimation.play();
      })

    });
  }, [lastProgress, progress]);


  return (
    <div className={classNames(styles.progressBarContainer, className)}>
      {/* @ts-ignore */}
      <div ref={progressRef} className={styles.completedPercentage} />
      {/* @ts-ignore */}
      <div ref={springRef} className={styles.completedPercentageSpring} style={{
        width: `${progressWidth}%`,
      }} />
    </div>
  )
}

type ProgressBar = {
  className?: string,
  lastProgress: number,
  progress: number,
}

export default ProgressBar;