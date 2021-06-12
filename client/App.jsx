import React, { useState, useEffect } from 'react';
import Related from './components/related/Related/RelatedList';
import Inventory from './components/related/Inventory/InventoryList';
import QAndA from './components/qanda/QAndA';
import Overview from './components/overview/Overview';
// import QAndA from './components/qanda/QAndA';
import axios from 'axios';

const fetch = require('node-fetch');

function App() {
  const [id, setId] = useState(20103);
  const [selectedProduct, setSelectedProduct] = useState();
  // const [selecetedStyle, setSelectedStyle] = useState();
  const [favorites, setFavorites] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  async function getProduct() {
    let product = await fetch(`/products/${id}`);
    product = await product.json();
    product.starRating = 0;
    product.styleThumbnail = [];
    product.styleList = [];
    setSelectedProduct(product);
  }

  async function getStyles() {
    let response = await fetch(`/products/${id}/styles`);
    response = await response.json();
    response.results.forEach(async (style) => {
      const thisStyle = {
        id: style.style_id,
        name: style.name,
        default_price: selectedProduct.default_price,
        original_price: style.original_price,
        sale_price: style.sale_price,
        photos: style.photos,
        skus: style.skus,
      };
      selectedProduct.styleThumbnail.push(style.photos[0].thumbnail_url);
      selectedProduct.styleList.push(thisStyle);
    });
  }

  const getReviews = async () => {
    let response = await fetch(`/reviews?product_id=${id}`);
    response = await response.json();
    selectedProduct.totalNumReviews = response.results.length;
    const reviewsTemp = response.results.map(async (review) => {
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
      return thisReview;
    });
    const resolved = await Promise.all(reviewsTemp);
    setReviews(resolved);
  };

  const calculateRating = (obj) => {
    const total = Object.keys(obj.ratings).reduce((accumRating, curr) =>
    accumRating + parseInt(curr) * parseInt(obj.ratings[curr]), 0);
    const amount = Object.values(obj.ratings).reduce((accum, curr) => accum + parseInt(curr), 0);
    return (total / amount) || 0;
  };

  const getRatings = async () => {
    let rating = await fetch(`/reviews/meta?product_id=${id}`);
    rating = await rating.json();
    rating = calculateRating(rating);
    selectedProduct.rating = rating;
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      getStyles();
      getReviews();
      getRatings();
      setIsLoaded(true);
    }
  }, [selectedProduct]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  console.log(selectedProduct);
  return (
    <div>
      <div>Hello from App</div>
      <div>
        {/* <Overview product={selectedProduct} /> */}
        {/* {console.log('this is when done rendering', stylesList)} */}
        <QAndA product={selectedProduct} />
      </div>
      <Related product={selectedProduct} />
      <Inventory product={selectedProduct} />
    </div>
  );
}

export default App;

// useEffect(() => {
//   fetch(`http://localhost:3000/products/${id}`)
//     .then((response) => response.json())
//     .then((data) => setProduct(data))
//     // .then(console.log('logging state product id:', product))
//     .catch((error) => console.log(error));
//   // console.log('hello from use effect');
//   // getProductList();
// }, []);