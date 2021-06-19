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
      <div>There are no reviews for this product.</div>
      <button type="button" id="show-review-form" onClick={showReviewFormHandler}>Write the first review!</button>
      {showReviewForm
        ? (
          <ReviewForm
            showReviewFormHandler={showReviewFormHandler}
            reviewMeta={reviewMeta}
            id={id}
            sortByDate={sortByDate}
            theme={theme}
            product={product}
          />
        ) : null}
    </>
  );
};

export default NoReviews;
