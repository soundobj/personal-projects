import React from 'react';

import styles from "./info.module.scss"

const Info = (props: Info) => {

  return (
    <article className={styles.info}>
      <header>Controls</header>
      <dl>
        <dt>move:</dt>
        <dd>arrow keys</dd>
      </dl>
      <dl>
        <dt>rotate clockwise:</dt>
        <dd>up arrow key</dd>
      </dl>
      <dl>
        <dt>rotate anti-clockwise:</dt>
        <dd>/ key</dd>
      </dl>
      <dl>
        <dt>move to bottom:</dt>
        <dd>space bar</dd>
      </dl>
    </article>
  )
}

type Info = {
}

export default Info;