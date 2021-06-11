import React, { useState, useEffect } from 'react';
import Related from './components/related/Related/RelatedList';
import Inventory from './components/related/Inventory/InventoryList';
import QAndA from './components/qanda/QAndA';
import Overview from './components/overview/Overview';

const fetch = require('node-fetch');

function App() {
  const [id, setId] = useState(20102);
  const [selectedProduct, setSelectedProduct] = useState();
  // const [selecetedStyle, setSelectedStyle] = useState();
  const [favorites, setFavorites] = useState([]);
  // const [stateProductList, setStateProductList] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // let productList = [];

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
    // const resolved = await Promise.all(stylesTemp);
    // setSelectedStyle(set your default style);
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

  // async function getProductList() {
  //   let response = await fetch('/products');
  //   response = await response.json();
  //   let i = 0;
  //   response.forEach((product) => {
  //     const thisProduct = {
  //       index: i,
  //       id: product.id,
  //       category: product.category,
  //       default_price: product.default_price,
  //       description: product.description,
  //       name: product.name,
  //       slogan: product.slogan,
  //       starRating: null,
  //       totalNumReviews: null,
  //       features: [],
  //       styleThumbnail: [],
  //       styleList: [],
  //       reviews: [],
  //     };
  //     productList.push(thisProduct);
  //     i += 1;
  //   });
  // }

  // function calculateRating(product) {
  //   if (product.reviews.length) {
  //     let total = 0;
  //     for (let i = 0; i < product.reviews.length; i++) {
  //       total += product.reviews[i].rating;
  //     }
  //     total /= product.reviews.length;
  //     product.starRating = total;
  //   }
  // }

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      getStyles();
      getReviews();
      setIsLoaded(true);
    }
    // async function initialize(cb) {
      // await getProductList();
      // await getProduct();
      // for (let i = 0; i < productList.length; i++) {
      //   let product = productList[i];
      //   await getProduct(product.id, i)
      // }
      // for (let i = 0; i < productList.length; i++) {
      //   let product = productList[i];
      //   await getStyles(product.id, i)
      // }
      // for (let i = 0; i < productList.length; i++) {
      //   let product = productList[i];
      //   await getReviews(product.id, i)
      // }
      // calculateRating();
      // setStateProductList(productList);
      // setSelectedProduct(productList[4]);
      // setSelectedStyle(productList[0].styleList[0]);
      // setReviews(productList[4].reviews);
      // cb(true);
    // }
    // initialize(setIsLoaded);
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
      </div>
      <Related product={selectedProduct} />
      <Inventory product={selectedProduct} />
    </div>
  );
}

export default App;
