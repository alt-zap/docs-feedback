function getPageStatusColor(positiveReviews, negativeReviews) {
  const approvalRate = positiveReviews / (positiveReviews + negativeReviews);

  let statusColor;
  if (approvalRate >= 0.8) {
    statusColor = 'green';
  } else if (approvalRate >= 0.5) {
    statusColor = 'yellow';
  } else {
    statusColor = 'red';
  }

  return statusColor;
}

export default getPageStatusColor;
