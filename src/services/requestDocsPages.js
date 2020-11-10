import { getPageStatusColor } from '@utils';
import db from './firebase';

async function requestDocsPages() {
  const feedbackSnapshot = await db.collection('feedback').get();

  const docsPages = feedbackSnapshot.docs.map((page) => {
    const {
      title,
      positiveReviews = 0,
      negativeReviews = 0,
      pendingReviews,
    } = page.data();

    const statusColor = getPageStatusColor(positiveReviews, negativeReviews);

    return {
      id: page.id,
      title,
      statusColor,
      pendingReviews,
    };
  });

  return docsPages;
}

export default requestDocsPages;
