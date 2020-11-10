import React, { useCallback, useEffect } from 'react';
import clsx from 'clsx';

import styles from '@styles/components/common/Modal.module.css';

import { enableBodyScroll, disableBodyScroll } from '@utils/modal';

function Modal(props) {
  const {
    active,
    onClose: closeModal,
    className,
    children,
    ...rest
  } = props;

  useEffect(() => {
    if (active) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }
  }, [active]);

  return (
    <div
      className={clsx(styles.container, active && styles.active, className)}
      {...rest}
    >
      {children}
      <div className={styles.clickableBackground} onClick={closeModal} />
    </div>
  );
}

export default Modal;
