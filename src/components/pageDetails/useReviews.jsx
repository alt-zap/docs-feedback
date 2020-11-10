/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInfinityScroll } from '@components';
import { createReviewsListener } from '@services';
import useDetails from './useDetails';

function useReviews(pageId, options) {
  const details = useDetails(pageId);

  const [reviews, setReviews] = useState({
    pending: [],
    archived: [],
  });

  const loadPendingReviews = useCallback((pagePendingReviews) => {
    setReviews((previousReviews) => ({
      ...previousReviews,
      pending: pagePendingReviews,
    }));
  }, []);

  const loadArchivedReviews = useCallback((pageArchivedReviews) => {
    setReviews((previousReviews) => ({
      ...previousReviews,
      archived: pageArchivedReviews,
    }));
  }, []);

  const createPendingReviewsListener = useCallback((limitOfReviews) => {
    return createReviewsListener(pageId, loadPendingReviews, {
      filter: { field: 'pending', value: true },
      limitOfReviews,
    });
  }, [pageId, loadPendingReviews]);

  const createArchivedReviewsListener = useCallback((limitOfReviews) => {
    return createReviewsListener(pageId, loadArchivedReviews, {
      filter: { field: 'pending', value: false },
      limitOfReviews,
    });
  }, [pageId, loadArchivedReviews]);

  const pendingReviewsRef = useRef({
    listener: null,
    limitOfReviews: 20,
  });

  const archivedReviewsRef = useRef({
    listener: null,
    limitOfReviews: 20,
  });

  useEffect(() => {
    pendingReviewsRef.current.listener = (
      pageId ? createPendingReviewsListener(20) : null
    );
    archivedReviewsRef.current.listener = (
      pageId ? createArchivedReviewsListener(20) : null
    );
  }, [pageId, createPendingReviewsListener, createArchivedReviewsListener]);

  useEffect(() => {
    return () => {
      pendingReviewsRef.current.listener?.removeSnapshotListener();
      archivedReviewsRef.current.listener?.removeSnapshotListener();
    };
  }, []);

  const increaseLimitOfReviews = useCallback(() => {
    const {
      numberOfPositiveReviews,
      numberOfNegativeReviews,
      numberOfPendingReviews,
    } = details;

    const { activeReviewGroupName } = options;

    if (activeReviewGroupName === 'pending') {
      const currentLimit = pendingReviewsRef.current.limitOfReviews;
      const listenerExists = Boolean(pendingReviewsRef.current.listener);

      if (currentLimit > numberOfPendingReviews || !listenerExists) return;

      const newLimit = currentLimit + 20;

      const { current: currentRef } = pendingReviewsRef;
      currentRef.listener.removeSnapshotListener();
      currentRef.listener = createPendingReviewsListener(newLimit);
      currentRef.limitOfReviews = newLimit;
    } else if (activeReviewGroupName === 'archived') {
      const totalReviews = numberOfPositiveReviews + numberOfNegativeReviews;
      const numberOfArchivedReviews = totalReviews - numberOfPendingReviews;
      const currentLimit = archivedReviewsRef.current.limitOfReviews;
      const listenerExists = Boolean(archivedReviewsRef.current.listener);

      if (currentLimit > numberOfArchivedReviews || !listenerExists) return;

      const newLimit = currentLimit + 20;

      const { current: currentRef } = archivedReviewsRef;
      currentRef.listener.removeSnapshotListener();
      currentRef.listener = createArchivedReviewsListener(newLimit);
      currentRef.limitOfReviews = newLimit;
    }
  }, [
    details,
    options,
    createPendingReviewsListener,
    createArchivedReviewsListener,
  ]);

  useInfinityScroll(increaseLimitOfReviews);

  return reviews;
}

export default useReviews;
