import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QAndA from './components/qanda/QAndA';
import sampleData from '../sampleData';

function App() {
  const [product, setProduct] = useState('');
  const [selecetedStyle, setSelectedStyle] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [stateProductList, setStateProductList] = useState([]);
  const [reviews, setReviews] = useState([]);

  let productList = [];

  async function getProduct(id, index) {
    let product = productList[index];
    let results = await fetch(`/products/${id}`);
    results = await results.json();
    product.features = results.features;
  };

  async function getStyles(id, index)  {
    let response = await fetch(`/products/${id}/styles`);
    response = await response.json();
    let product = productList[index];
    response.results.forEach((style) => (
    product.styleThumbnail.push(style[0].thumbnail_url)
    let style = {
      id: style.style_id,
      name: style.name,
      default_price: product.default_price,
      original_price: style.original_price,
      sale_price: style.sale_price,
      photos: style.photos,
      skus: style.skus,
    }
    product.styleList.push(style);
    ))
  }

  async function getProductList() {
    let response = await fetch('/products');
    response = await response.json();
    response.forEach((product) => (
      let thisProduct = {
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
    }
    productList.push(thisProduct);
    ));
  };

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
  let product = productList[index];
  let response = await fetch(`/reviews?product_id=${id}`);
  response = await response.json();
  product.totalNumReviews = response.results.length;
  response.results.forEach((review) => (
    let review = {
      id: review.review_id,
      body: review.body,
      photos: review.photos,
      summary: review.summary,
      rating: review.rating,
      recommend: review.recommend,
      response: review.reponse,
      reviewer_name: review.reviewer_name,
    }
    productList[index].reviews.push(review);
  ))
  }


  useEffect(() => {
    getProductList()
    productList.forEach((product, index) => getProduct(product.id, index));
    productList.forEach((product, index) => getStyle(product.id, index));
    productList.forEach((product, index) => getReviews(product.id, index));
    productList.forEach((product, index) => calculateRating(product));
    setStateProductList(productList)
    setProduct(productList[0]);
    setSelectedStyle(productList[0].styleList[0])
  }, []);

  return (
    <div>
      <div>Hello from App</div>
      <div>
        {/* {console.log('this is when done rendering', stylesList)} */}
        <QAndA product={product} />
      </div>
    </div>
  );
};

export default App;
