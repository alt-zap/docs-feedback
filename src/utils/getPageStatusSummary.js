import getPageStatusColor from './getPageStatusColor';
import getPageStatusMessage from './getPageStatusMessage';

function getPageStatusSummary(numberOfPositiveReviews, numberOfNegativeReviews) {
  const color = (
    getPageStatusColor(numberOfPositiveReviews, numberOfNegativeReviews)
  );
  const message = (
    getPageStatusMessage(numberOfPositiveReviews, numberOfNegativeReviews)
  );

  return {
    color,
    label: message.label,
    description: message.description,
  };
}

export default getPageStatusSummary;
