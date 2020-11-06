import React from 'react';
import clsx from 'clsx';

import styles from '../../styles/components/common/Layout.module.css';

function Layout({ className, children, ...rest }) {
  return (
    <div className={clsx(styles.container, className)} {...rest}>
      {children}
    </div>
  );
}

export default Layout;
