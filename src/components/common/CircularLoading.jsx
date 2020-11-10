import React from 'react';
import clsx from 'clsx';
import { BiLoaderAlt } from 'react-icons/bi';

import styles from '@styles/components/common/CircularLoading.module.css';

function CircularLoading({ className, ...rest }) {
  return (
    <BiLoaderAlt
      className={clsx(styles.loadingIcon, className)}
      {...rest}
    />
  );
}

export default CircularLoading;
