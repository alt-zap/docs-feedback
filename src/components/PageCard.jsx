import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { BsCardText } from 'react-icons/bs';
import { FaRegCheckCircle } from 'react-icons/fa';
import { HiArrowNarrowRight } from 'react-icons/hi';

import styles from '../styles/components/PageCard.module.css';

function PageCard({ pageId, title, statusColor, pendingReviews }) {
  return (
    <Link href={`/page-details/${pageId}`}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h4 className={styles.title}>
            {title}
          </h4>

          <div className={clsx(styles.statusCircle, styles[statusColor])} />
        </header>

        <footer className={styles.footer}>
          <div className={styles.pendingReviews}>
            {pendingReviews > 0 ? (
              <BsCardText className={styles.pendingReviewsIcon} />
            ) : (
              <FaRegCheckCircle className={styles.pendingReviewsIcon} />
            )}

            <p className={styles.pendingReviewsText}>
              {`${pendingReviews} avaliações pendentes`}
            </p>
          </div>

          <HiArrowNarrowRight className={styles.arrowRight} />
        </footer>
      </div>
    </Link>
  );
}

export default PageCard;
