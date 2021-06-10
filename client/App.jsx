import React, { useState, useEffect } from 'react';
import Overview from './components/overview/Overview';

function App() {
  const [selectedProduct, setSelectedProduct] = useState('');
  // const [selecetedStyle, setSelectedStyle] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [stateProductList, setStateProductList] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

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

  function productCH(direction) {
    // if (direction === 'right') {
    //   if (index === products.length - 1) {
    //     setIndex(0);
    //   } else {
    //     setIndex(index + 1);
    //   }
    // } else if (index === 0) {
    //   setIndex(products.length - 1);
    // } else {
    //   setIndex(index - 1);
    // }
    // setPhotoIndex(0);
    // setStyleIndex(0);
    // setSkuState({ quantity: 0, size: 'empty' });

    // setSelectedProduct(???)
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
      // setSelectedStyle(productList[0].styleList[0]);
      setReviews(productList[0].reviews);
      setIsLoaded(true);
    }
    initialize();
  }, []);
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  console.log(stateProductList);
  return (
    <div>
      <div>Hello from App</div>
      <div>
        <Overview products={stateProductList} selected={selectedProduct} ch={productCH} />
      </div>
    </div>
  );
};

export default App;
