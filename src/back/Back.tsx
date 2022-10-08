import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import { ReactComponent as BackIcon } from "../assets/back.svg";
import styles from './Back.module.scss';
import classnames from 'classnames';

const Back = (props: Back) => {
  const { className } = props;
  const { pathname } = useLocation();

  return (
    <Link to={`/`} title="Back to main">
      <BackIcon className={classnames(
        styles.back,
        className,
        {[styles.hide]: pathname === '/' }
      )} />
    </Link>
  )
}

type Back = {
  className?: string,
}

export default Back;


