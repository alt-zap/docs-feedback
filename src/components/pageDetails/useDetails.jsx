/* eslint-disable consistent-return */
import { useCallback, useEffect, useState } from 'react';
import { createPageDetailsListener } from '@services';
import { getPageStatusSummary } from '@utils';

function useDetails(pageId) {
  const [details, setDetails] = useState({});

  const loadPageDetails = useCallback((pageDetails) => {
    const {
      numberOfPositiveReviews,
      numberOfNegativeReviews,
    } = pageDetails;

    const totalReviews = numberOfPositiveReviews + numberOfNegativeReviews;
    const approvalRate = numberOfPositiveReviews / totalReviews;

    const status = (
      getPageStatusSummary(numberOfPositiveReviews, numberOfNegativeReviews)
    );

    setDetails({
      ...pageDetails,
      approvalRate,
      status,
    });
  }, []);

  useEffect(() => {
    if (!pageId) return;

    const pageDetailsListener = (
      createPageDetailsListener(pageId, loadPageDetails)
    );

    return () => {
      pageDetailsListener.removeSnapshotListener();
    };
  }, [pageId, loadPageDetails]);

  return details;
}

export default useDetails;
