import React from 'react';
import clsx from 'clsx';

import styles from '../../styles/components/common/GridList.module.css';

function GridList({ className, children, ...rest }) {
  return (
    <div className={clsx(styles.container, className)} {...rest}>
      {children}
    </div>
  );
}

export default GridList;
