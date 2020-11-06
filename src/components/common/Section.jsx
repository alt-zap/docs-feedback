import React from 'react';

import styles from '../../styles/components/common/Section.module.css';

function Section({ title, className, children, ...rest }) {
  return (
    <div className={className} {...rest}>
      <h3 className={styles.title}>
        {title}
      </h3>
      {children}
    </div>
  );
}

export default Section;
