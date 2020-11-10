import db from './firebase';

function createPageDetailsListener(pageId, callback) {
  function handleSnapshot(pageSnapshot) {
    const {
      title,
      positiveReviews = 0,
      negativeReviews = 0,
      pendingReviews,
    } = pageSnapshot.data();

    const pageDetails = {
      id: pageSnapshot.id,
      title,
      numberOfPositiveReviews: positiveReviews,
      numberOfNegativeReviews: negativeReviews,
      numberOfPendingReviews: pendingReviews,
    };

    callback(pageDetails);
  }

  const removeSnapshotListener = db.collection('feedback')
    .doc(pageId)
    .onSnapshot(handleSnapshot);

  return { removeSnapshotListener };
}

export default createPageDetailsListener;
