import React from 'react';
import clsx from 'clsx';

import styles from '@styles/components/pageDetails/DetailsItem.module.css';

function DetailsItem({ title, className, fields, children, ...rest }) {
  return (
    <div className={clsx(styles.container, className)} {...rest}>
      <h3 className={styles.title}>
        {title}
      </h3>

      {fields && (
        <div className={styles.fields}>
          {fields.map((field) => (
            <div key={field.label} className={styles.field}>
              <p className={styles.fieldLabel}>
                {field.label}
              </p>
              <p className={styles.fieldValue}>
                {field.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {children}
    </div>
  );
}

export default DetailsItem;
