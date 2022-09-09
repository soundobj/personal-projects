import React, { useRef, useEffect, useState } from 'react';

import styles from "./progressBar.module.scss"
import classNames from 'classnames';

// https://blog.maximeheckel.com/posts/the-physics-behind-spring-animations
// https://codesandbox.io/s/simple-spring-animation-x2svy?from-embed=&file=/index.html
// https://www.kirillvasiltsov.com/writing/how-to-create-a-spring-animation-with-web-animation-api/

const ProgressBar = (props: ProgressBar) => {

  const { className, completedPercentage, test } = props;
  const [percentage, setPercentage] = useState<number>(0);
  const progressRef = useRef();
  
 
  useEffect(() => {
    const progressKeyframes = new KeyframeEffect(
        // @ts-ignore
        progressRef.current,
        [
          { transform: 'scaleX(3)' },
          { transform: 'scaleX(6)' }
        ],
        { duration: 300, fill: 'forwards' }
      );
    
    const progressAnimation = new Animation(progressKeyframes, document.timeline);
    
    progressAnimation.play();

    const onFinished = progressAnimation.finished;

    onFinished.then(() => {
      console.log('progressAnimation finished');
    });
  }, []);


  return (
    <>
      <div className={classNames(styles.progressBarContainer, className)}>
        {/* @ts-ignore */}
        <div ref={progressRef} className={styles.completedPercentage} style={{}}></div>
      </div>
    </>
  )
}

type ProgressBar = {
  className?: string,
  completedPercentage?: number,
  test?: boolean
}

export default ProgressBar;