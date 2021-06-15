import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewPhoto from './ReviewPhoto';
import RenderStars from './RenderStars';

const ReviewItem = (props) => {
  const { review } = props;
  const { key } = props;

  const [reviewDate, setDate] = useState('');
  const [reviewHelpfulness, setHelpfulness] = useState(0);

  const dateFormatter = (date) => {
    let result = '';
    const currentMonth = date.slice(5, 7);
    if (currentMonth === '01') {
      result = result.concat('January ');
    } else if (currentMonth === '02') {
      result = result.concat('February ');
    } else if (currentMonth === '03') {
      result = result.concat('March ');
    } else if (currentMonth === '04') {
      result = result.concat('April ');
    } else if (currentMonth === '05') {
      result = result.concat('May ');
    } else if (currentMonth === '06') {
      result = result.concat('June ');
    } else if (currentMonth === '07') {
      result = result.concat('July ');
    } else if (currentMonth === '08') {
      result = result.concat('August ');
    } else if (currentMonth === '09') {
      result = result.concat('September ');
    } else if (currentMonth === '10') {
      result = result.concat('October ');
    } else if (currentMonth === '11') {
      result = result.concat('November ');
    } else if (currentMonth === '12') {
      result = result.concat('December ');
    }

    result = result.concat(`${date.slice(8, 10)}, `);
    result = result.concat(date.slice(0, 4));
    setDate([...result]);
  };

  useEffect(() => { dateFormatter(review.date); }, [props.review]);
  useEffect(() => { setHelpfulness(review.helpfulness); }, [props.review]);

  const helpfulHandler = (e) => {
    console.log('clicked:', e.target.id);
    const revId = parseInt(e.target.id);
    console.log('revId', revId, typeof revId);
    axios.put(`/reviews/${revId}/helpful`);
    setHelpfulness(reviewHelpfulness + 1);
  };

  // { params: { review_id: revId } }

  return (
    <div>
      <ul className="review" key={key} >
        <h6 className="rating">
          Rating:
          <RenderStars rating={review.rating} />
        </h6>
        <div>{reviewDate}</div>
        <h3>{review.summary}</h3>
        <p>{review.body}</p>
        {review.photos.length ? review.photos.map((photo, index) => (
          <ReviewPhoto photo={photo} key={index} />)).slice(0, 5) : null}
        {review.recommend ? (
          <div>
            I recommend this product
            <i className="fas fa-check" />
          </div>
        )
          : null}
        <div>
          author:
          {review.reviewer_name}
        </div>
        <>
          {review.response === '' || review.response === null ? <div /> : (
            <>
              <div>
                Response:
                {review.response}
              </div>
            </>
          )}
        </>
        <div className="helpfulness">
          Was this review helpful?
          {' '}
          <button id={review.review_id} onClick={(e) => helpfulHandler(e)}>Yes</button>
          {`     ${reviewHelpfulness}`}
        </div>
      </ul>
    </div>
  );
};

export default ReviewItem;
