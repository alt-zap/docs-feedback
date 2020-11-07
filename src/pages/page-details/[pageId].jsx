/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { HiArrowNarrowLeft } from 'react-icons/hi';

import {
  createPageDetailsListener,
  createReviewsListener,
  archiveReview,
} from '@services';
import {
  DetailsItem,
  ReviewCard,
  ExpandedReview,
} from '@components/pageDetails';
import {
  GridList,
  Layout,
  ProgressCircle,
  Section,
  CircularLoading,
  Modal,
  Button,
} from '@components/common';
import {
  getPageStatusColor,
  getPageStatusMessage,
  objectHasOwnProperty,
} from '@utils';

import styles from '@styles/pages/PageDetails.module.css';

function PageDetails() {
  const router = useRouter();

  const [pageId, setPageId] = useState();

  useEffect(() => {
    setPageId(router.query.pageId);
  }, [router.query]);

  const [details, setDetails] = useState({});
  const [pendingReviews, setPendingReviews] = useState([]);
  const [archivedReviews, setArchivedReviews] = useState([]);
  const [status, setStatus] = useState({});

  const [activeReviewGroupName, setActiveReviewGroupName] = useState('pending');
  const [expandedReview, setExpandedReview] = useState({ active: false });

  function getStatusSummary(pageDetails) {
    const { positiveReviews, negativeReviews } = pageDetails;

    const color = getPageStatusColor(positiveReviews, negativeReviews);
    const message = getPageStatusMessage(positiveReviews, negativeReviews);

    return {
      color,
      label: message.label,
      description: message.description,
    };
  }

  function loadPageDetails(pageDetails) {
    const { positiveReviews, negativeReviews } = pageDetails;

    const approvalRate = positiveReviews / (positiveReviews + negativeReviews);

    setDetails({
      ...pageDetails,
      approvalRate,
    });
    setStatus(getStatusSummary(pageDetails));
  }

  function loadPendingReviews(pagePendingReviews) {
    setPendingReviews(pagePendingReviews);
  }

  function loadArchivedReviews(pageArchivedReviews) {
    setArchivedReviews(pageArchivedReviews);
  }

  useEffect(() => {
    if (!pageId) return;

    const pageDetailsListener = createPageDetailsListener(
      pageId,
      loadPageDetails,
    );

    return () => {
      pageDetailsListener.removeSnapshotListener();
    };
  }, [pageId]);

  useEffect(() => {
    if (!pageId) return;

    function createPendingReviewsListener(limitOfReviews) {
      return createReviewsListener(pageId, loadPendingReviews, {
        filter: { field: 'pending', value: true },
        limitOfReviews,
      });
    }

    function createArchivedReviewsListener(limitOfReviews) {
      return createReviewsListener(pageId, loadArchivedReviews, {
        filter: { field: 'pending', value: false },
        limitOfReviews,
      });
    }

    let pendingReviewsListener = createPendingReviewsListener(20);
    let archivedReviewsListener = createArchivedReviewsListener(20);

    function handleScroll() {
      const bodyHeight = document.querySelector('body').scrollHeight;
      const windowBottomY = window.innerHeight + window.scrollY;

      const hasReachedTheBottomOfThePage = windowBottomY === bodyHeight;

      if (hasReachedTheBottomOfThePage) {
        const totalPendingReviews = details.pendingReviews;

        if (activeReviewGroupName === 'pending') {
          const currentLimit = pendingReviewsListener.limitOfReviews;

          if (currentLimit > totalPendingReviews) return;

          pendingReviewsListener.removeSnapshotListener();
          pendingReviewsListener = createPendingReviewsListener(
            currentLimit + 20,
          );
        } else {
          const totalReviews = details.positiveReviews + details.negativeReviews;
          const totalArchivedReviews = totalReviews - totalPendingReviews;
          const currentLimit = archivedReviewsListener.limitOfReviews;

          if (currentLimit > totalArchivedReviews) return;

          archivedReviewsListener.removeSnapshotListener();
          archivedReviewsListener = createArchivedReviewsListener(
            currentLimit + 20,
          );
        }
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      pendingReviewsListener.removeSnapshotListener();
      archivedReviewsListener.removeSnapshotListener();

      window.removeEventListener('scroll', handleScroll);
    };
  }, [pageId, details, activeReviewGroupName]);

  function isDetailsReady() {
    return objectHasOwnProperty(details, 'title');
  }

  function isPendingReviewsReady() {
    const noPendingReviewsToLoad = details.pendingReviews === 0;
    const necessaryPendingReviewsLoaded = (
      details.pendingReviews > 0 && pendingReviews.length > 0
    );

    return noPendingReviewsToLoad || necessaryPendingReviewsLoaded;
  }

  function isArchivedReviewsReady() {
    const totalReviews = details.positiveReviews + details.negativeReviews;
    const totalArchivedReviews = totalReviews - details.pendingReviews;

    const noArchivedReviewsToLoad = totalArchivedReviews === 0;
    const necessaryArchivedReviewsLoaded = (
      totalArchivedReviews > 0 && archivedReviews.length > 0
    );

    return noArchivedReviewsToLoad || necessaryArchivedReviewsLoaded;
  }

  function isActiveReviewGroupReady() {
    return activeReviewGroupName === 'pending'
      ? isPendingReviewsReady()
      : isArchivedReviewsReady();
  }

  function expandReview(reviewIndex) {
    setExpandedReview({
      active: true,
      index: reviewIndex,
    });
  }

  function closeExpandedReview() {
    setExpandedReview({ active: false });
  }

  function archiveExpandedReview() {
    const reviewToArchive = pendingReviews[expandedReview.index];

    closeExpandedReview();

    archiveReview(pageId, reviewToArchive);
  }

  function handleActiveReviewGroupChange() {
    setActiveReviewGroupName(
      activeReviewGroupName === 'pending'
        ? 'archived'
        : 'pending',
    );
  }

  const activeReviewGroup = activeReviewGroupName === 'pending'
    ? pendingReviews
    : archivedReviews;

  if (!isDetailsReady()) {
    return (
      <div className={styles.pageLoadingContainer}>
        <CircularLoading className={styles.pageLoading} />
      </div>
    );
  }

  return (
    <Layout className={styles.layout}>
      <header className={styles.header}>
        <HiArrowNarrowLeft
          className={styles.arrowLeft}
          onClick={() => router.push('/')}
        />
        <h2 className={styles.title}>
          {details.title}
        </h2>
      </header>

      <Section title="Detalhes">
        <div className={styles.detailsContainer}>
          <DetailsItem
            title="Total"
            fields={[
              { label: 'Avaliações positivas', value: details.positiveReviews },
              { label: 'Avaliações negativas', value: details.negativeReviews },
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
                values={{ target: details.approvalRate * 100 }}
                animation={{ duration: 1000, delay: 500 }}
              />
            </div>
          </DetailsItem>
        </div>
      </Section>

      <Section
        title={
          activeReviewGroupName === 'pending'
            ? `Avaliações pendentes: ${details.pendingReviews}`
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

        {isActiveReviewGroupReady() ? (
          <GridList>
            {activeReviewGroup.map((review, index) => (
              <ReviewCard
                key={review.id}
                reviewType={review.reviewType}
                message={review.feedbackMessage}
                timestamp={review.timestamp}
                onClick={() => expandReview(index)}
              />
            ))}
          </GridList>
        ) : (
          <div className={styles.reviewsSectionLoadingContainer}>
            <CircularLoading className={styles.reviewsSectionLoading} />
          </div>
        )}
      </Section>

      <Modal active={expandedReview.active} onClose={closeExpandedReview}>
        {expandedReview.active && (
          <ExpandedReview
            review={activeReviewGroup[expandedReview.index]}
            onClose={closeExpandedReview}
            onArchive={archiveExpandedReview}
          />
        )}
      </Modal>
    </Layout>
  );
}

export default PageDetails;
