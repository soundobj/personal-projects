import React from 'react';

import styles from "./level.module.scss"
import classNames from 'classnames';

const Level = (props: Level) => {

  const { children, className, level } = props;

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
}

export default Level;