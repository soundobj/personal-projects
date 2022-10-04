import React, { useEffect, useRef } from 'react';

import styles from "./level.module.scss"
import classNames from 'classnames';
import fitty from 'fitty';

const Level = (props: Level) => {

  const { children, className, level, onLevelChange } = props;

  useEffect(() => {
    const levelTextFittyInstance = fitty(`.${styles.text}`);
    levelTextFittyInstance[0].element.addEventListener('fit', (e) => {
      // @ts-ignore
      const newFontSize = e.detail.newValue;
      onLevelChange(newFontSize);
  });
  }, []);

  return (
    <dl>
      <dt>Level</dt>
      <dd>
        <div className={styles.container}>
          <h1 className={classNames(styles.text, className)}>{level}</h1>
          {children}
        </div>
      </dd>
    </dl>
  )
}

type Level = {
  children?: any[],
  className?: string,
  level: string,
  onLevelChange: (newFontSize: number) => void;
}

export default Level;