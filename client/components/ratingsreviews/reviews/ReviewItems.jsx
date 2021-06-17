import React, { useState, useEffect } from 'react';
import ReviewItem from './ReviewItem';
import ReviewForm from './ReviewForm';

const ReviewItems = (props) => {
  // eslint-disable-next-line prefer-const
  const { reviewMeta, id } = props;
  let [currentList, increaseCurrentList] = useState(2);
  const [showReviewForm, toggleShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState(props.reviews);
  const [reviewFilter, setReviewFilter] = useState(props.reviewFilter);

  const seeMoreHandler = () => {
    increaseCurrentList(currentList += 2);
  };

  const sortHandler = (e) => {
    console.log('selected:', e.target.value);
    if (e.target.value === 'Newest') {
      sortByDate();
    } else if (e.target.value === 'Helpful') {
      sortByHelpful();
    } else {
      sortByRelevance();
    }
  };

  const sortByRelevance = (arr) => {
    const temp = arr || reviews;
    for (let r = 0; r < temp.length; r++) {
      const currentDate = new Date();
      const oldness = currentDate.toString().slice(11, 15) - temp[r].date.toString().slice(11, 5);
      const relevance = temp[r].helpfulness - (2 * oldness);
      temp[r].relevance = relevance;
    }

    const sorter = (arr) => {
      let changes = 0;
      for (let n = 0; n < arr.length; n++) {
        if (arr[n + 1] && arr[n].relevance < arr[n + 1].relevance) {
          const tempVal = arr[n];
          arr[n] = arr[n + 1];
          arr[n + 1] = tempVal;
          changes += 1;
        }
      }
      if (changes > 0) {
        (sorter(arr));
      } else {
        setReviews([...arr]);
      }
    };

    sorter(temp);
  };

  const sortByHelpful = () => {
    console.log('sorting by helpful');
    const temp2 = reviews;
    const sorter = (arr) => {
      let changes = 0;
      for (let m = 0; m < arr.length; m++) {
        if (arr[m + 1] && arr[m].helpfulness < arr[m + 1].helpfulness) {
          const tempVal = arr[m];
          arr[m] = arr[m + 1];
          arr[m + 1] = tempVal;
          changes += 1;
        }
      }
      if (changes > 0) {
        (sorter(arr));
      } else {
        setReviews([...arr]);
      }
    };
    sorter(temp2);
    console.log('current state:', reviews);
  };

  const sortByDate = async () => {
    let response = await fetch(`/reviews?product_id=${id}&sort=newest&count=1000`);
    response = await response.json();
    // selectedProduct.totalNumReviews = response.results.length;
    setReviews(response.results);
  };

  const filterReviews = () => {
    if (reviewFilter.length) {
      const temp = [];
      for (let f = 0; f < reviews.length; f++) {
        if (reviewFilter.indexOf(reviews[f].rating) > -1) {
          temp.push(reviews[f]);
        }
      }
      setReviews([...temp]);
    } else {
      setReviews([...props.reviews]);
    }
  };

  useEffect(() => {
    filterReviews();
  }, [reviewFilter]);

  const showReviewFormHandler = () => {
    console.log('clicked');
    toggleShowReviewForm(!showReviewForm);
  };

  return (
    <div>
      <ul className="reviewListBox">
        <label htmlFor="sortOptions">Sort By</label>
        <select name="sortOptions" id="sortOptions" onChange={(e) => sortHandler(e)}>
          <option value="Relevant">Relevant</option>
          <option value="Helpful">Helpful</option>
          <option value="Newest">Newest</option>
        </select>

          {reviews.length ? reviews.map((review, index) => (
            <ReviewItem review={review} key={index} />
          )).slice(0, currentList) : null}
        
        {(reviews && reviews.length > 2) ? <button type="button" onClick={seeMoreHandler}>See More</button> : null}
        <button type="button" id="show-review-form" onClick={showReviewFormHandler}>Write a Review</button>
        {showReviewForm
          ? (
            <ReviewForm
              showReviewFormHandler={showReviewFormHandler}
              reviewMeta={reviewMeta}
              id={id}
              sortByDate={sortByDate}
            />
          ) : null}
      </ul>
    </div>
  );
};

export default ReviewItems;
