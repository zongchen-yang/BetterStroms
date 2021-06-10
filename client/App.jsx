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
//import QAndA from './components/qanda/QAndA';

function App() {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selecetedStyle, setSelectedStyle] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [stateProductList, setStateProductList] = useState([]);
  const [reviews, setReviews] = useState([]);

  let productList = [];

  async function getProduct(id, index) {
    const product = productList[index];
    let results = await fetch(`/products/${id}`);
    results = await results.json();
    product.features = results.features;
  }

  async function getStyles(id, index) {
    let response = await fetch(`/products/${id}/styles`);
    response = await response.json();
    const product = productList[index];
    response.results.forEach((style) => {
      const thisStyle = {
        id: style.style_id,
        name: style.name,
        default_price: product.default_price,
        original_price: style.original_price,
        sale_price: style.sale_price,
        photos: style.photos,
        skus: style.skus,
      };
      product.styleThumbnail.push(style.photos[0].thumbnail_url);
      product.styleList.push(thisStyle);
    });
  }

  async function getProductList() {
    let response = await fetch('/products');
    response = await response.json();
    response.forEach((product) => {
      const thisProduct = {
        id: product.id,
        category: product.category,
        default_price: product.default_price,
        description: product.description,
        name: product.name,
        slogan: product.slogan,
        starRating: null,
        totalNumReviews: null,
        features: [],
        styleThumbnail: [],
        styleList: [],
        reviews: [],
      };
      productList.push(thisProduct);
    });
  }

  function calculateRating(product) {
    if (product.reviews.length) {
      let total = 0;
      for (let i = 0; i < product.reviews.length; i++) {
        total += product.reviews[i].rating;
      }
      total /= product.reviews.length;
      product.starRating = total;
    }
  };

  async function getReviews(id, index) {
    const product = productList[index];
    let response = await fetch(`/reviews?product_id=${id}`);
    response = await response.json();
    product.totalNumReviews = response.results.length;
    response.results.forEach((review) => {
      const thisReview = {
        id: review.review_id,
        body: review.body,
        photos: review.photos,
        summary: review.summary,
        rating: review.rating,
        recommend: review.recommend,
        response: review.reponse,
        reviewer_name: review.reviewer_name,
      };
      productList[index].reviews.push(thisReview);
    });
  }

  useEffect(() => {
    async function initialize() {
      await getProductList();
      for (let i = 0; i < productList.length; i++) {
        let product = productList[i];
        await getProduct(product.id, i)
      }
      for (let i = 0; i < productList.length; i++) {
        let product = productList[i];
        await getStyles(product.id, i)
      }
      for (let i = 0; i < productList.length; i++) {
        let product = productList[i];
        await getReviews(product.id, i)
      }
      productList.forEach((product) => calculateRating(product));
      setStateProductList(productList);
      setSelectedProduct(productList[0]);
      setSelectedStyle(productList[0].styleList[0]);
      setReviews(productList[0].reviews);
    }
    initialize();
  }, []);
  console.log(stateProductList);
  console.log(selectedProduct);
  console.log(selecetedStyle);
  console.log(reviews);
  return (
    <div>
      <div>Hello from App</div>
      <div>
        {/* {console.log('this is when done rendering', stylesList)} */}
        {/* <QAndA product={product} /> */}
      </div>
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
