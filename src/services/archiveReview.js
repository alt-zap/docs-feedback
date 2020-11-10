import firebase from 'firebase/app';
import 'firebase/firestore';

import db from './firebase';

async function archivedReview(pageId, review) {
  const updatePromises = [
    db.collection('feedback').doc(pageId)
      .collection('reviews').doc(review.id)
      .update({ pending: false }),

    db.collection('feedback').doc(pageId)
      .update({ pendingReviews: firebase.firestore.FieldValue.increment(-1) }),
  ];

  await Promise.all(updatePromises);
}

export default archivedReview;
