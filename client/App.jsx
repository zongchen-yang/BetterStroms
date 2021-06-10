import React, { useState, useEffect } from 'react';
import ReviewList from './components/ratingsreviews/reviews/ReviewList';
import sampleData from './sampleData';

const App = function () {
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState({});
  const [reviewMeta, setReviewMeta] = useState({});
  const [overallRating, setRating] = useState(0);
  const [id, setId] = useState(20104);

  const calculateRating = () => {
    if (reviews.length) {
      let total = 0;
      for (let i = 0; i < reviews.length; i++) {
        total += reviews[i].rating;
      }
      total /= reviews.length;
      setRating(total);
    }
  };

  async function fetchReviews() {
    if (id) {
      const response = await fetch(`/reviews?product_id=${id}`);
      const json = await response.json();
      for (let j = 0; j < json.results.length; j++) {
        const oldDate = json.results[j].date.slice(0, 10);
        const newDate = new Date(oldDate);
        json.results[j].newDate = newDate;
      }
      await setReviews(json.results);
    }
  }

  async function fetchReviewMeta() {
    if (id) {
      const response = await fetch(`/reviews/meta?product_id=${id}`);
      const json = await response.json();
      await setReviewMeta(json);
    }
  }

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log(error));
  }, ['stop']);

  useEffect(() => { fetchReviews(); }, [id]);
  useEffect(() => { fetchReviewMeta(); }, [id]);
  useEffect(() => { calculateRating(); }, [reviews.length]);
  return (
    <div>
      <div>Hello from App</div>
      <ReviewList
        product={product}
        reviews={reviews}
        overallRating={overallRating}
        reviewMeta={reviewMeta}
      />
    </div>
  );
};

// import React, { useState, useEffect } from 'react';
// import ReviewList from './components/ratingsreviews/reviews/ReviewList';
// import sampleData from './sampleData';

// const App = function () {
//   const [product, setProduct] = useState({});
//   const [reviews, setReviews] = useState({});
//   // useEffect(()=> {
//   //   setProduct(productId = params.id)
//   //   fetch()
//   // })
//   useEffect(() => {
//     fetch('http://localhost:3000/products/20104')
//       .then((response) => response.json())
//       .then((data) => setProduct(data))
//       // .then(console.log('logging state product id:', { product }))
//       .catch((error) => console.log(error));
//     // console.log('hello from use effect');
//   }, ['stop']);

//   async function fetchReviews() {
//     const response = await fetch(`/reviews?product_id=20104`);
//     const json = await response.json();
//     console.log(json);
//     await setReviews(json);
//   }
//   // });
//   useEffect(() => { fetchReviews(); }, ['stop']);

//   return (
//     <div>
//       <div>Hello from App</div>
//       <ReviewList reviews={reviews} />
//     </div>
//   );
// };

// export default App;
export default App;
