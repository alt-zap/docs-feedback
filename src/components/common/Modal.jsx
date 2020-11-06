import React, { useEffect } from 'react';
import clsx from 'clsx';

import { getScrollbarWidth } from '../../utils';

import styles from '../../styles/components/common/Modal.module.css';

function Modal(props) {
  const {
    active,
    onClose: closeModal,
    className,
    children,
    ...rest
  } = props;

  const body = document.querySelector('body');

  function preventHorizontalReflow() {
    const scrollbarWidth = getScrollbarWidth();
    body.style.paddingRight = `${scrollbarWidth}px`;
  }

  function enableBodyScroll() {
    const scrollY = Math.abs(parseFloat(body.style.top)) || 0;

    body.style.position = '';
    body.style.top = '';
    body.style.paddingRight = '';

    window.scrollTo(0, scrollY);
  }

  function disableBodyScroll() {
    const bodyHeight = parseFloat(
      window.getComputedStyle(body).getPropertyValue('height'),
    );

    const isScrollbarBeingDisplayed = bodyHeight > window.innerHeight;

    if (isScrollbarBeingDisplayed) {
      preventHorizontalReflow();
    }

    body.style.top = `${-window.scrollY}px`;
    body.style.position = 'fixed';
  }

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
