import React, { useState, useEffect } from 'react';
import Related from './components/related/Related/RelatedList';
import Inventory from './components/related/Inventory/InventoryList';
import QAndA from './components/qanda/QAndA';
import Overview from './components/overview/Overview';

function App() {
  const [id, setId] = useState(20103);
  const [selectedProduct, setSelectedProduct] = useState();
  const [favorites, setFavorites] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewMeta, setReviewMeta] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  async function getProduct() {
    let product = await fetch(`/products/${id}`);
    product = await product.json();
    const thisProduct = {
      id: product.id,
      category: product.category,
      default_price: product.default_price,
      description: product.description,
      name: product.name,
      slogan: product.slogan,
      features: product.features,
      starRating: null,
      totalNumReviews: null,
      styleThumbnail: [],
      styleList: [],
    };
    setSelectedProduct(thisProduct);
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
    setReviews(response.results);
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
    setReviewMeta(rating);
    rating = calculateRating(rating);
    selectedProduct.starRating = rating;
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
