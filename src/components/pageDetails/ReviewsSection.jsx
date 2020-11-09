import React, { useCallback, useMemo, useState } from 'react';
import clsx from 'clsx';

import { Button, CircularLoading, GridList, Section } from '@components/common';

import styles from '@styles/components/pageDetails/ReviewsSection.module.css';

import ReviewCard from './ReviewCard';
import useDetails from './useDetails';
import useReviews from './useReviews';

function ReviewsSection({ pageId, onExpandReview: expandReview }) {
  const details = useDetails(pageId);
  const {
    numberOfPositiveReviews,
    numberOfNegativeReviews,
    numberOfPendingReviews,
  } = details;

  const [activeReviewGroupName, setActiveReviewGroupName] = useState('pending');

  const reviews = useReviews(pageId, { activeReviewGroupName });
  const {
    pending: pendingReviews,
    archived: archivedReviews,
  } = reviews;

  const activeReviewGroup = useMemo(() => (
    activeReviewGroupName === 'pending'
      ? pendingReviews
      : archivedReviews
  ), [activeReviewGroupName, pendingReviews, archivedReviews]);

  const isPendingReviewsReady = useMemo(() => {
    const noPendingReviewsToLoad = numberOfPendingReviews === 0;
    const necessaryPendingReviewsLoaded = (
      numberOfPendingReviews > 0 && pendingReviews.length > 0
    );

    return noPendingReviewsToLoad || necessaryPendingReviewsLoaded;
  }, [numberOfPendingReviews, pendingReviews.length]);

  const isArchivedReviewsReady = useMemo(() => {
    const totalReviews = numberOfPositiveReviews + numberOfNegativeReviews;
    const totalArchivedReviews = totalReviews - numberOfPendingReviews;

    const noArchivedReviewsToLoad = totalArchivedReviews === 0;
    const necessaryArchivedReviewsLoaded = (
      totalArchivedReviews > 0 && archivedReviews.length > 0
    );

    return noArchivedReviewsToLoad || necessaryArchivedReviewsLoaded;
  }, [
    numberOfPositiveReviews,
    numberOfNegativeReviews,
    numberOfPendingReviews,
    archivedReviews.length,
  ]);

  const isActiveReviewGroupReady = useMemo(() => (
    activeReviewGroupName === 'pending'
      ? isPendingReviewsReady
      : isArchivedReviewsReady
  ), [activeReviewGroupName, isPendingReviewsReady, isArchivedReviewsReady]);

  const handleActiveReviewGroupChange = useCallback(() => {
    setActiveReviewGroupName((previousActiveGroupName) => (
      previousActiveGroupName === 'pending'
        ? 'archived'
        : 'pending'
    ));
  }, []);

  return (
    <Section
      title={
        activeReviewGroupName === 'pending'
          ? `Avaliações pendentes: ${numberOfPendingReviews}`
          : 'Avaliações arquivadas'
      }
      className={styles.pendingReviewsSection}
    >
      <div className={styles.switchActiveReviewGroupContainer}>
        <Button
          label="Pendentes"
          fillMode={activeReviewGroupName === 'pending' ? 'fill' : 'outline'}
          className={clsx(
            styles.switchActiveReviewGroup,
            styles.toPending,
          )}
          onClick={handleActiveReviewGroupChange}
          disabled={activeReviewGroupName === 'pending'}
        />
        <Button
          label="Arquivadas"
          fillMode={activeReviewGroupName === 'archived' ? 'fill' : 'outline'}
          className={clsx(
            styles.switchActiveReviewGroup,
            styles.toArchived,
          )}
          onClick={handleActiveReviewGroupChange}
          disabled={activeReviewGroupName === 'archived'}
        />
      </div>

      {isActiveReviewGroupReady ? (
        <GridList>
          {activeReviewGroup.map((review) => (
            <ReviewCard
              key={review.id}
              reviewType={review.reviewType}
              message={review.feedbackMessage}
              timestamp={review.timestamp}
              onClick={() => expandReview(review)}
            />
          ))}
        </GridList>
      ) : (
        <div className={styles.reviewsSectionLoadingContainer}>
          <CircularLoading className={styles.reviewsSectionLoading} />
        </div>
      )}
    </Section>
  );
}

export default ReviewsSection;
