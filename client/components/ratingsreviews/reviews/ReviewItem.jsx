import React from 'react';

const ReviewItem = (props) => (
  <div>
    <li className="review">
      <div>
        ID:
        {props.review.review_id}
      </div>
      <h3>{props.review.summary}</h3>
      <div>
        author:
        {props.review.reviewer_name}
      </div>
      <div>{props.review.date}</div>
      <div className="helpfulness">
        helpful:
        {props.review.helpfulness}
      </div>
      <h6 className="rating">
        Rating:
        {props.review.rating}
      </h6>
      <p>
        {props.review.body}
      </p>
    </li>
  </div>
);

export default ReviewItem;
