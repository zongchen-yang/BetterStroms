import React, { useState } from 'react';
import ReviewForm from './ReviewForm';

const NoReviews = (props) => {
  const {
    reviewMeta, id, sortByDate, theme, product,
  } = props;
  const [showReviewForm, toggleShowReviewForm] = useState(false);

  const showReviewFormHandler = () => {
    toggleShowReviewForm(!showReviewForm);
  };

  return (
    <>
      <div>There are no reviews for this product. Write the first review!</div>
    </>
  );
};

export default NoReviews;
