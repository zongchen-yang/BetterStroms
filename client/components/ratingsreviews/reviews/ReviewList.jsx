import React, { useState, useEffect } from 'react';
import ReviewItems from './ReviewItems';
import ReviewsBreakdown from './ReviewsBreakdown';

const ReviewList = (props) => {
  // const [reviews, setReviews] = useState({});
  const { reviews } = props;
  const { product } = props;
  const { overallRating } = props;
  const { reviewMeta } = props;
  const { id } = product;

  // async function fetchReviews() {
  //   if (id) {
  //     const response = await fetch(`/reviews?product_id=${id}`);
  //     const json = await response.json();
  //     for (let j = 0; j < json.results.length; j++) {
  //       const oldDate = json.results[j].date.slice(0, 10);
  //       const newDate = new Date(oldDate);
  //       json.results[j].newDate = newDate;
  //     }
  //     await setReviews(json.results);
  //   }
  // }
  // });
  // useEffect(() => { fetchReviews(); }, [id]);

  return (
    <div>
      <h5>Ratings and Reviews</h5>
      {reviews.length
        ? (
          <>
            <ReviewsBreakdown
              reviews={reviews}
              overallRating={overallRating}
              reviewMeta={reviewMeta}
            />
            <ReviewItems reviews={reviews} />
          </>
        )
        : null}
    </div>
  );
};

export default ReviewList;

// import React, { useState, useEffect } from 'react';
// import ReviewItems from './ReviewItems';

// const ReviewList = (props) => {
//   const { reviews } = props;
//   // const { product } = props;
//   // const { id } = product;

//   // async function fetchReviews() {
//   //   if (props.product.id) {
//   //     const response = await fetch(`/reviews?product_id=${id}`);
//   //     const json = await response.json();
//   //     console.log(json);
//   //     await setReviews(json);
//   //   }
//   // }
//   // // });
//   // useEffect(() => { fetchReviews(); }, [id]);

//   return (
//     <div>
//       <h5>Ratings and Reviews</h5>
//       <ReviewItems reviews={reviews} />
//     </div>
//   );
// };

// export default ReviewList;
