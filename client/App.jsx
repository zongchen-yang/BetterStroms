import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QAndA from './components/qanda/QAndA';
import sampleData from '../sampleData';

const App = () => {
  const [product, setProduct] = useState('');

  const getProduct = async () => {
    const results = await axios.get(`/products/${id}`);
    // console.log('this is your product data', results.data);
    // const { category, slogan, default_price, name, description, features} = results.data;
    setProduct(results.data);
  };

  // const getStylesList = async () => {
  //   const results = await axios.get(`/products/${id}/styles`);
  //   console.log(results.data.results[0]);
  //   setStylesList(results.data.results);
  //   setStyleId(results.data.results[0].styles_id);
  //   setStylePhotosArray(results.data.results[0].photos);
  // };

  // const getProductList = async () => {
  //   const productResults = await axios.get('/products');
  //   setProductList(productResults.data);
  // };

  // const calculateRating = () => {
  //   if (reviews.length) {
  //     let total = 0;
  //     for (let i = 0; i < reviews.length; i++) {
  //       total += reviews[i].rating;
  //     }
  //     total /= reviews.length;
  //     setRating(total);
  //   }
  // };

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
  //     await setTotalNumberReviews(json.results.length);
  //   }
  // }

  useEffect(() => getProduct();)

  // useEffect(() => {
  //   getProduct();
  //   fetchReviews();
  //   // calculateRating();
  //   getStylesList();
  // }, [id]);

  // // useEffect(() => { getProduct(); }, [id]);
  // // useEffect(() => { fetchReviews(); }, [id]);
  // useEffect(() => { calculateRating(); }, [reviews.length]);
  // useEffect(() => { getProductList(); }, [productList.length]);
  // // useEffect(() => { getStylesList(); }, [id]);

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

// useEffect(() => {
//   fetch(`http://localhost:3000/products/${id}`)
//     .then((response) => response.json())
//     .then((data) => setProduct(data))
//     // .then(console.log('logging state product id:', product))
//     .catch((error) => console.log(error));
//   // console.log('hello from use effect');
//   // getProductList();
// }, []);