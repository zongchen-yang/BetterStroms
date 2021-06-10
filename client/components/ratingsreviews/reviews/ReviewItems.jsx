import React, { useState, useEffect } from 'react';
import ReviewItem from './ReviewItem';

const ReviewItems = (props) => {
  // eslint-disable-next-line prefer-const
  let [currentList, increaseCurrentList] = useState(2);
  const [reviews, setReviews] = useState(props.reviews);

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

  const sortByDate = () => {
    const temp = reviews;
    // for (let j = 0; j < temp.length; j++) {
    //   const oldDate = temp[j].date.slice(0, 10);
    //   const newDate = new Date(oldDate);
    //   temp[j].newDate = newDate;
    // }

    const sorter = (arr) => {
      let changes = 0;
      for (let k = 0; k < arr.length; k++) {
        if (arr[k + 1] && arr[k].newDate < arr[k + 1].newDate) {
          const tempVal = arr[k];
          arr[k] = arr[k + 1];
          arr[k + 1] = tempVal;
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

  return (
    <div>
      <ul className="reviewListBox">
        <label htmlFor="sortOptions">Sort By</label>
        <select name="sortOptions" id="sortOptions" onChange={(e) => sortHandler(e)}>
          <option value="Relevant">Relevant</option>
          <option value="Helpful">Helpful</option>
          <option value="Newest">Newest</option>
        </select>
        {(reviews && reviews.length > 2) ? <button type="button" onClick={seeMoreHandler}>See More</button> : null}
        {reviews.length ? reviews.map((review) => (
          <ReviewItem review={review} />
        )).slice(0, currentList) : null}
      </ul>
    </div>
  );
};

export default ReviewItems;
