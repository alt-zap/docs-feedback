import React, { memo, useMemo } from 'react';
import clsx from 'clsx';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';

import styles from '@styles/components/pageDetails/ReviewCard.module.css';

function ReviewCard(props) {
  const {
    reviewType,
    message,
    timestamp,
    className,
    ...rest
  } = props;

  const formattedReviewSubmissionDate = useMemo(() => {
    const reviewSubmissionDate = timestamp.toDate();

    return reviewSubmissionDate.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }, [timestamp]);

  return (
    <div className={clsx(styles.container, className)} {...rest}>
      <header className={styles.header}>
        <h4 className={clsx(styles.message, !message && styles.emptyMessage)}>
          {message || '[Sem mensagem adicional]'}
        </h4>

        {reviewType === 'positive' ? (
          <AiOutlineLike
            className={clsx(styles.reviewIcon, styles.likeIcon)}
          />
        ) : (
          <AiOutlineDislike
            className={clsx(styles.reviewIcon, styles.dislikeIcon)}
          />
        )}
      </header>

      <footer className={styles.footer}>
        <div className={styles.timeAgo}>
          {formattedReviewSubmissionDate}
        </div>

        <HiArrowNarrowRight className={styles.arrowRight} />
      </footer>
    </div>
  );
}

export default memo(ReviewCard);
