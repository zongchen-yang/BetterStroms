import React, { useState, useEffect } from 'react';
import ComponentRatingBreakdown from './ComponentRatingBreakdown';
import RenderStars from './RenderStars';
// import Rating from '../../related/related/Rating';

const ReviewsBreakdown = (props) => {
  const { reviews } = props;
  const { overallRating } = props;
  const { reviewMeta } = props;
  const { totalNumberOfRatings } = props;
  const { reviewFilterHelper } = props;
  const { filtersUsedString } = props;
  const { theme } = props;
  const [percentageOf5s, setPercentageOf5s] = useState([]);
  const [percentageOf4s, setPercentageOf4s] = useState('0%');
  const [percentageOf3s, setPercentageOf3s] = useState('0%');
  const [percentageOf2s, setPercentageOf2s] = useState('0%');
  const [percentageOf1s, setPercentageOf1s] = useState('0%');
  const [percentageRecommends, setPercentageRecommends] = useState('0%');

  const calculatePercentages = () => {
    if (reviewMeta.ratings) {
      let total = 0;
      for (let i = 1; i < 6; i++) {
        if (reviewMeta.ratings[i]) {
          total += parseInt(reviewMeta.ratings[i]);
        }
      }
      const perc5s = reviewMeta.ratings[5] ? (reviewMeta.ratings[5] / total) : 0.00;
      const perc4s = reviewMeta.ratings[4] ? (reviewMeta.ratings[4] / total) : 0.00;
      const perc3s = reviewMeta.ratings[3] ? (reviewMeta.ratings[3] / total) : 0.00;
      const perc2s = reviewMeta.ratings[2] ? (reviewMeta.ratings[2] / total) : 0.00;
      const perc1s = reviewMeta.ratings[1] ? (reviewMeta.ratings[1] / total) : 0.00;
      const arr = [perc5s, perc4s, perc3s, perc2s, perc1s];

      for (let j = 0; j < arr.length; j++) {
        if (arr[j] === 1) {
          arr[j] = '100%';
        } else {
          arr[j] = arr[j].toFixed(2, 10).toString().slice(2, 4).concat('%');
        }
      }

      let recommends = (reviewMeta.recommended.true / total);
      if (recommends === 1) {
        recommends = '100%';
      } else {
        recommends = recommends.toFixed(2, 10).toString().slice(2, 4);
      }

      setPercentageOf5s(arr[0]);
      setPercentageOf4s(arr[1]);
      setPercentageOf3s(arr[2]);
      setPercentageOf2s(arr[3]);
      setPercentageOf1s(arr[4]);
      setPercentageRecommends(recommends);
    }
  };

  useEffect(() => { calculatePercentages(); }, [reviewMeta]);

  const breakdownClickHandler = (val) => {
    reviewFilterHelper(val);
  };

  const clearFilters = () => {
    reviewFilterHelper('clear');
  };

  return (
    <>
      {reviewMeta.ratings
        ? (
          <>
            <div id={theme ? 'review-breakdown-box' : 'review-breakdown-box-dark'}>
              <div id="header-filter-container">
                <div id="breakdown-header">
                  Overall Rating:
                  {' '}
                  <RenderStars rating={overallRating} />
                  {' '}
                  of
                  {' '}
                  {totalNumberOfRatings}
                  {' '}
                  ratings.
                </div>
                <div>{filtersUsedString}</div>
              </div>
              <button type="button" id="clearButton" onClick={clearFilters}>Clear Filters</button>
                <div className="reviewBreakdownItem" onClick={() => breakdownClickHandler(5)}>
                  <div className="declareStars" value="5">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    {' '}
                    {reviewMeta.ratings[5] || 0}
                  </div>
                  <div id="reviewTotal" value="5">
                    <div id="starDistribution" value="5" style={{ width: percentageOf5s }} />
                  </div>
                </div>
                <div className="reviewBreakdownItem" onClick={() => breakdownClickHandler(4)}>
                  <div className="declareStars">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    {' '}
                    {reviewMeta.ratings[4] || 0}
                  </div>
                  <div id="reviewTotal">
                    <div id="starDistribution" style={{ width: percentageOf4s }} />
                  </div>
                </div>
                <div className="reviewBreakdownItem" onClick={() => breakdownClickHandler(3)}>
                  <div className="declareStars">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    {' '}
                    {reviewMeta.ratings[3] || 0}
                  </div>
                  <div id="reviewTotal">
                    <div id="starDistribution" style={{ width: percentageOf3s }} />
                  </div>
                </div>
                <div className="reviewBreakdownItem" onClick={() => breakdownClickHandler(2)}>
                  <div className="declareStars">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    {' '}
                    {reviewMeta.ratings[2] || 0}
                  </div>
                  <div id="reviewTotal">
                    <div id="starDistribution" style={{ width: percentageOf2s }} />
                  </div>
                </div>
                <div className="reviewBreakdownItem" onClick={() => breakdownClickHandler(1)}>
                  <div className="declareStars">
                    <i className="fas fa-star" />
                    {' '}
                    {reviewMeta.ratings[1] || 0}
                  </div>
                  <div id="reviewTotal">
                    <div id="starDistribution" style={{ width: percentageOf1s }} />
                  </div>
                </div>
                <div id="recommended">
                  {percentageRecommends || 0}
                  {' '}
                  of reviewers recommend this product.
                </div>
                <ComponentRatingBreakdown reviewMeta={reviewMeta} />
            </div>
          </>
        ) : null }
    </>
  );
};

export default ReviewsBreakdown;
