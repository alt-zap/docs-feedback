import clsx from 'clsx';
import React from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

import styles from '../../styles/components/common/CircularLoading.module.css';

function CircularLoading({ className, ...rest }) {
  return (
    <BiLoaderAlt
      className={clsx(styles.loadingIcon, className)}
      {...rest}
    />
  );
}

export default CircularLoading;
