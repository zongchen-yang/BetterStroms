import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewItem from './ReviewItem';

const ReviewList = (props) => {
  const [reviews, setReviews] = useState({});

  //when clicked, put 1 more review in the current list of reviews
  const seeMoreHandler = () => {
    currentList.push(reviews.results[currentList.length])
    console.log(currentList)
    //re-render the list
  };
//currentList is a subset of the full list of reviews
  const currentList = reviews.results ? reviews.results.slice(0, 2) : null;

  //map over the current list
  useEffect(() => {
    
  })
  const reviewList = (reviews.results)
    ? currentList.map((review) => <ReviewItem review={review} />) : null;

  useEffect(() => {
    async function fetchProduct() {
      console.log('called fetch 1');
      const response = await fetch('/reviews?product_id=20104');
      const json = await response.json();
      console.log(json);
      await setReviews(json);
    }
    fetchProduct();

    // const result = await axios(
    //   'http://localhost:3000/reviews?product_id=20104',
    // );

    // setReviews(result)
    // (console.log('reviews:', reviews))
  }, [props.product.id]);

  console.log('reviews', reviews);

  return (
    <div>
      <h5>Ratings and Reviews</h5>
      <button onClick={seeMoreHandler}>See More</button>
      {reviewList}
    </div>
  );
};

export default ReviewList;
