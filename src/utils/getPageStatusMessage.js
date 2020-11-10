const statusMessages = {
  good: {
    label: 'Bom',
    description: 'Esta página está indo bem',
  },
  medium: {
    label: 'Atenção',
    description: 'Esta página não está sendo útil para uma parte dos usuários',
  },
  bad: {
    label: 'Revisão necessária',
    description: 'A maioria dos usuários não achou esta página útil',
  },
};

function getPageStatusMessage(positiveReviews, negativeReviews) {
  const approvalRate = positiveReviews / (positiveReviews + negativeReviews);

  let pageAssessment;
  if (approvalRate >= 0.8) {
    pageAssessment = 'good';
  } else if (approvalRate >= 0.5) {
    pageAssessment = 'medium';
  } else {
    pageAssessment = 'bad';
  }

  return statusMessages[pageAssessment];
}

export default getPageStatusMessage;
