import React from 'react';
import clsx from 'clsx';

import styles from '../../styles/components/common/Button.module.css';

function Button(props) {
  const {
    label,
    type = 'button',
    fillMode,
    className,
    ...rest
  } = props;

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={clsx(styles.container, styles[fillMode], className)}
      {...rest}
    >
      {label}
    </button>
  );
}

export default Button;
