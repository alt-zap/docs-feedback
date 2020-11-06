import React from 'react';
import clsx from 'clsx';
import { IoMdClose } from 'react-icons/io';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';

import { Button } from './common';

import styles from '../styles/components/ExpandedReview.module.css';

function ExpandedReview(props) {
  const {
    review,
    onClose: closeReview,
    onArchive: archiveReview,
    className,
    ...rest
  } = props;

  const { reviewType, feedbackMessage, timestamp, pending } = review;

  const submissionTime = timestamp.toDate().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const submissionDate = timestamp.toDate().toLocaleDateString('pt-BR');

  return (
    <div className={clsx(styles.container, className)} {...rest}>
      <IoMdClose className={styles.closeIcon} onClick={closeReview} />

      <header className={styles.header}>
        <div className={clsx(styles.reviewTypeContainer, styles[reviewType])}>
          {reviewType === 'positive' ? (
            <>
              Positiva
              <AiOutlineLike className={styles.reviewTypeIcon} />
            </>
          ) : (
            <>
              Negativa
              <AiOutlineDislike className={styles.reviewTypeIcon} />
            </>
          )}
        </div>
      </header>

      <main className={styles.main}>
        <p
          className={clsx(
            styles.feedbackMessage,
            !feedbackMessage && styles.emptyMessage,
          )}
        >
          {feedbackMessage || '[Sem mensagem adicional]'}
        </p>

        <div className={styles.submissionTimeContainer}>
          <h4 className={styles.submissionTimeLabel}>
            Enviada em:
          </h4>
          <p className={styles.submissionTime}>
            {submissionTime}
            <span className={styles.submissionTimeSeparator} />
            {submissionDate}
          </p>
        </div>
      </main>

      <footer className={styles.footer}>
        {pending ? (
          <Button label="Arquivar" onClick={archiveReview} fillMode="fill" />
        ) : (
          <p className={styles.archivedReviewLabel}>
            Arquivada
          </p>
        )}
      </footer>
    </div>
  );
}

export default ExpandedReview;
