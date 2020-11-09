/* eslint-disable consistent-return */
import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { HiArrowNarrowLeft } from 'react-icons/hi';

import { useRouterQuery } from '@components';
import { Layout, CircularLoading, Modal } from '@components/common';
import {
  DetailsSection,
  ReviewsSection,
  ExpandedReview,
  useDetails,
} from '@components/pageDetails';
import { archiveReview } from '@services';
import { objectHasOwnProperty } from '@utils';

import styles from '@styles/pages/PageDetails.module.css';

function PageDetails() {
  const router = useRouter();

  const { pageId } = useRouterQuery();
  const details = useDetails(pageId);
  const [expandedReview, setExpandedReview] = useState({ active: false });

  const isDetailsReady = useMemo(() => (
    objectHasOwnProperty(details, 'title')
  ), [details]);

  const expandReview = useCallback((review) => {
    setExpandedReview({
      active: true,
      review,
    });
  }, []);

  const closeExpandedReview = useCallback(() => {
    setExpandedReview({ active: false });
  }, []);

  const archiveExpandedReview = useCallback(() => {
    const reviewToArchive = expandedReview.review;

    closeExpandedReview();
    archiveReview(pageId, reviewToArchive);
  }, [pageId, expandedReview, closeExpandedReview]);

  if (!isDetailsReady) {
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

      <DetailsSection details={details} />

      <ReviewsSection pageId={pageId} onExpandReview={expandReview} />

      <Modal active={expandedReview.active} onClose={closeExpandedReview}>
        {expandedReview.active && (
          <ExpandedReview
            review={expandedReview.review}
            onClose={closeExpandedReview}
            onArchive={archiveExpandedReview}
          />
        )}
      </Modal>
    </Layout>
  );
}

export default PageDetails;
