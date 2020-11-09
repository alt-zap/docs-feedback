import React from 'react';
import clsx from 'clsx';

import { ProgressCircle, Section } from '@components/common';

import styles from '@styles/components/pageDetails/DetailsSection.module.css';

import DetailsItem from './DetailsItem';

function DetailsSection({ details }) {
  const {
    numberOfPositiveReviews,
    numberOfNegativeReviews,
    approvalRate,
    status,
  } = details;

  return (
    <Section title="Detalhes">
      <div className={styles.detailsContainer}>
        <DetailsItem
          title="Total"
          fields={[
            {
              label: 'Avaliações positivas',
              value: numberOfPositiveReviews,
            },
            {
              label: 'Avaliações negativas',
              value: numberOfNegativeReviews,
            },
          ]}
          className={styles.reviewCount}
        />

        <DetailsItem title="Status" className={styles.detailsStatus}>
          <div className={styles.statusContainer}>
            <div className={styles.statusTexts}>
              <h3 className={clsx(styles.statusLabel, styles[status.color])}>
                {status.label}
              </h3>
              <p className={styles.statusDescription}>
                {status.description}
              </p>
            </div>

            <ProgressCircle
              size={110}
              colorName={status.color}
              values={{ target: approvalRate * 100 }}
              animation={{ duration: 1000, delay: 500 }}
            />
          </div>
        </DetailsItem>
      </div>
    </Section>
  );
}

export default DetailsSection;
