import React, { useState, useEffect } from 'react';
import ReviewItems from './ReviewItems';
import ReviewsBreakdown from './ReviewsBreakdown';
import ClickTracking from '../../../WithClickTrackingEventHandler';


const ReviewList = (props) => {
  const {
    product, theme
  } = props;
  const [reviewFilter, setReviewFilter] = useState([]);
  const [filtersUsedString, setFiltersUsedString] = useState('');
  const { id } = product;
  const overallRating = product.starRating;
  const totalNumberOfRatings = product.totalNumReviews;
  const [reviews, setReviews] = useState(props.reviews);
  const [reviewMeta, setReviewMeta] = useState(props.reviewMeta);

  const displayFiltersUsed = () => {
    if (reviewFilter.length === 0) {
      setFiltersUsedString('');
    } else {
      let starFilter = '';
      // const result = `Showing only ${starFilter}star reviews.`;
      for (let i = 0; i < reviewFilter.length; i++) {
        starFilter = starFilter.concat(`${reviewFilter[i].toString()} `);
      }
      if (starFilter.length > 2) {
        const tail = starFilter.slice(starFilter.length - 2, starFilter.length);
        const head = starFilter.slice(0, starFilter.length - 2);
        starFilter = `${head}& ${tail}`;
      }
      setFiltersUsedString(`Showing only ${starFilter}star reviews.`);
    }
  };

  const reviewFilterHelper = (num) => {
    const temp = reviewFilter;
    if (num === 'clear') {
      temp.splice(0, temp.length);
    } else if (temp.indexOf(num) >= 0) {
      temp.splice(temp.indexOf(num), 1);
    } else {
      temp.push(num);
    }
    setReviewFilter(temp);
    displayFiltersUsed();
  };

  return (
    <ClickTracking module="Ratings and Reviews">
      <div id="reviews-component-holder">
        <div id="reviews-component-header">Ratings and Reviews</div>
        {reviews.length
          ? (
            <ReviewsBreakdown
              reviews={reviews}
              overallRating={overallRating}
              reviewMeta={reviewMeta}
              totalNumberOfRatings={totalNumberOfRatings}
              reviewFilterHelper={reviewFilterHelper}
              filtersUsedString={filtersUsedString}
              theme={theme}
            />
          )
          : null}
        <>
          <ReviewItems
            key={reviewFilter}
            reviews={reviews}
            reviewFilter={reviewFilter}
            reviewMeta={reviewMeta}
            id={id}
            theme={theme}
            product={product}
          />
        </>
      </div>
    </ClickTracking>
  );
};

export default ReviewList;
