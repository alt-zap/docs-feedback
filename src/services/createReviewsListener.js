import db from './firebase';

function createReviewsListener(pageId, callback, options) {
  const { filter, limitOfReviews } = options;

  function handleSnapshot(reviewsSnapshot) {
    const reviews = reviewsSnapshot.docs.map((review) => {
      const {
        userReview: reviewType,
        feedbackMessage,
        timestamp,
        pending,
      } = review.data();

      return {
        id: review.id,
        reviewType,
        feedbackMessage,
        timestamp,
        pending,
      };
    });

    callback(reviews);
  }

  const removeSnapshotListener = db.collection('feedback')
    .doc(pageId)
    .collection('reviews')
    .where(filter.field, '==', filter.value)
    .limit(limitOfReviews)
    .onSnapshot(handleSnapshot);

  return {
    limitOfReviews,
    removeSnapshotListener,
  };
}

export default createReviewsListener;
