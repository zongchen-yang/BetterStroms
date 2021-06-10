import React, { useState, useEffect } from 'react';

const ReviewsBreakdown = (props) => {
  const { reviews } = props;
  const { overallRating } = props;
  const { reviewMeta } = props;
  const [percentageOf5s, setPercentageOf5s] = useState([]);
  const [percentageOf4s, setPercentageOf4s] = useState('0%');
  const [percentageOf3s, setPercentageOf3s] = useState('0%');
  const [percentageOf2s, setPercentageOf2s] = useState('0%');
  const [percentageOf1s, setPercentageOf1s] = useState('0%');

  const calculatePercentages = () => {
    if (reviewMeta.ratings) {
      let total = 0;
      for (let i = 1; i < 6; i++) {
        total += parseInt(reviewMeta.ratings[i]);
      }
      const perc5s = reviewMeta.ratings[5] ? (reviewMeta.ratings[5] / total) : 0.00;
      const perc4s = reviewMeta.ratings[4] ? (reviewMeta.ratings[4] / total) : 0.00;
      const perc3s = reviewMeta.ratings[3] ? (reviewMeta.ratings[3] / total) : 0.00;
      const perc2s = reviewMeta.ratings[2] ? (reviewMeta.ratings[2] / total) : 0.00;
      const perc1s = reviewMeta.ratings[1] ? (reviewMeta.ratings[1] / total) : 0.00;
      const arr = [perc5s, perc4s, perc3s, perc2s, perc1s];

      for (let j = 0; j < arr.length; j++) {
        arr[j] = arr[j].toString();
        arr[j] = arr[j].slice(2, 4);
        arr[j] = arr[j].concat('%');
      }
      setPercentageOf5s(arr[0]);
      setPercentageOf4s(arr[1]);
      setPercentageOf3s(arr[2]);
      setPercentageOf2s(arr[3]);
      setPercentageOf1s(arr[4]);
    }
  };

  useEffect(() => { calculatePercentages(); }, [reviewMeta]);

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
              <div className="declareStars">
                5 Star
                {' '}
                {reviewMeta.ratings[5] || 0}
              </div>
              <div id="reviewTotal">
                <div id="starDistribution" style={{ width: percentageOf5s }} />
              </div>
            </li>
            <li>
              <div className="declareStars">
                4 Star
                {' '}
                {reviewMeta.ratings[4] || 0}
              </div>
              <div id="reviewTotal">
                <div id="starDistribution" style={{ width: percentageOf4s }} />
              </div>
            </li>
            <li>
              <div className="declareStars">
                3 Star
                {' '}
                {reviewMeta.ratings[3] || 0}
              </div>
              <div id="reviewTotal">
                <div id="starDistribution" style={{ width: percentageOf3s }} />
              </div>
            </li>
            <li>
              <div className="declareStars">
                2 Star
                {' '}
                {reviewMeta.ratings[2] || 0}
              </div>
              <div id="reviewTotal">
                <div id="starDistribution" style={{ width: percentageOf2s }} />
              </div>
            </li>
            <li>
              <div className="declareStars">
                1 Star
                {' '}
                {reviewMeta.ratings[1] || 0}
              </div>
              <div id="reviewTotal">
                <div id="starDistribution" style={{ width: percentageOf1s }} />
              </div>
            </li>
          </ul>
        ) : null }
    </>
  );
};

export default ReviewsBreakdown;
