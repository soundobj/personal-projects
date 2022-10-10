import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import { useIsDevice } from '../hooks/useIsDevice';
import { ReactComponent as BackIcon } from "../assets/back.svg";
import styles from './Back.module.scss';
import classnames from 'classnames';


const Back = (props: Back) => {
  const { className } = props;
  const { pathname } = useLocation();
  const { isTablet } = useIsDevice();

  return (
    <Link to={`/`} title="Back to main">
      <BackIcon className={classnames(
        styles.back,
        className,
        {[styles.hide]: pathname === '/' || isTablet }
      )} />
    </Link>
  )
}

type Back = {
  className?: string,
}

export default Back;


