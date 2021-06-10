import React, { useState, useEffect } from 'react';

const ReviewsBreakdown = (props) => {
  const { reviews } = props;
  const { overallRating } = props;
  const { reviewMeta } = props;

  // const calculateRating = () => {
  //   let total = 0;
  //   for (let i = 0; i < reviews.length; i++) {
  //     total += reviews[i].rating;
  //   }
  //   total /= reviews.length;
  //   setRating(total);
  // };

  // useEffect(calculateRating(), ['stop']);

  return (
    <>
      <h2>
        Overall Rating:
        {overallRating}
        {' '}
        Total Ratings:
        {reviews.length}
      </h2>
      {reviewMeta.ratings
        ? (
          <ul className="reviewBreakdownBox">
            <li>
              5 Star {' '}
              {reviewMeta.ratings[5] || 0}
            </li>
            <li>
              4 Star {' '}
              {reviewMeta.ratings[4] || 0}
            </li>
            <li>
              3 Star {' '}
              {reviewMeta.ratings[3] || 0}
            </li>
            <li>
              2 Star {' '}
              {reviewMeta.ratings[2] || 0}
            </li>
            <li>
              1 Star {' '}
              {reviewMeta.ratings[1] || 0}
            </li>
          </ul>
        ) : null }
    </>
  );
};

export default ReviewsBreakdown;
