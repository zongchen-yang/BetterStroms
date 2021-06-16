import React, { useState, useEffect } from 'react';
import Related from './components/related/Related/RelatedList';
import Inventory from './components/related/Inventory/InventoryList';
import QAndA from './components/qanda/QAndA';
import ReviewList from './components/ratingsreviews/reviews/ReviewList';
import Overview from './components/overview/Overview';

function App() {
  const [id, setId] = useState(20104);
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
    return thisProduct;
  }

  async function getStyles() {
    let response = await fetch(`/products/${id}/styles`);
    response = await response.json();
    const styles = [];
    response.results.forEach(async (style) => {
      const thisStyle = {
        id: style.style_id,
        name: style.name,
        original_price: style.original_price,
        sale_price: style.sale_price,
        photos: style.photos,
        skus: style.skus,
        lastViewedIndex: 0,
      };
      styles.push(thisStyle);
    });
    return styles;
  }

  const getReviews = async (fetchProduct) => {
    let response = await fetch(`/reviews?product_id=${id}`);
    response = await response.json();
    fetchProduct.totalNumReviews = response.results.length;
    return response.results;
  };

  const calculateRating = (obj, fetchProduct) => {
    const total = Object.keys(obj.ratings).reduce((accumRating, curr) =>
    accumRating + parseInt(curr) * parseInt(obj.ratings[curr]), 0);
    const amount = Object.values(obj.ratings).reduce((accum, curr) => accum + parseInt(curr), 0);
    fetchProduct.totalNumReviews = amount;
    return (total / amount) || 0;
  };

  const deleteFavoriteCH = (item) => {
    const copy = favorites.slice();
    const toDelete = copy.indexOf(item);
    console.log(toDelete);
    copy.splice(toDelete, 1);
    setFavorites(copy);
  };

  const displayItemCH = (num) => {
    setIsLoaded(false);
    setId(num);
    // getProduct();
  };

  const getRatings = async (fetchProduct) => {
    let rating = await fetch(`/reviews/meta?product_id=${id}`);
    rating = await rating.json();
    setReviewMeta(rating);
    rating = calculateRating(rating, fetchProduct);
    // setting starRating as an object with a whole number and a decimal number
    fetchProduct.starRating = {
      whole: Math.floor(rating),
      part: `${Math.round(((rating - Math.floor(rating)) * 4)) * 25}%`,
    };
  };

  function favoriteCH(style) {
    if (style.isFavorite) {
      // remove from favorites
      style.isFavorite = false;
      const temp = [...favorites];
      let removedIndex = 0;
      temp.forEach((item, itemIndex) => {
        if (item.id === style.id) {
          removedIndex = itemIndex;
        }
      });
      temp.splice(removedIndex, 1);
      setFavorites(temp);
    } else {
      const temp = [...favorites];
      style.isFavorite = true;
      temp.push(style);
      setFavorites(temp);
      // add to favorites
    }
  }

  async function cartCH(sku, quantity) {
    console.log(`added ${quantity} of item with sku ${sku.value} to cart`);
    let skuInt = parseInt(sku.value, 10);
    const data = {
      sku_id: skuInt,
    };
    const respArray = [];
    for (let i = 0; i < quantity; i += 1) {
      const response = fetch('/cart', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      respArray.push(response);
    }
    Promise.all(respArray)
      .then((resArray) => console.log(resArray))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    async function initialize() {
      const fetchProduct = await getProduct();
      const fetchStyles = getStyles(fetchProduct);
      const fetchReviews = getReviews(fetchProduct);
      const fetchRatings = getRatings(fetchProduct);
      Promise.all([fetchStyles, fetchReviews, fetchRatings])
        .then(([fetchedStyles, fetchedReviews, fetchedRatings]) => {
          fetchProduct.styleList = fetchedStyles;
          setSelectedProduct(fetchProduct);
          setReviews(fetchedReviews);
          setIsLoaded(true);
        });
    }
    initialize();
  }, [id]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Overview product={selectedProduct} favoriteCH={favoriteCH} cartCH={cartCH} />
      <Related product={selectedProduct} displayItemCH={displayItemCH} />
      <Inventory
        favorites={favorites}
        deleteFavoriteCH={deleteFavoriteCH}
        displayItemCH={displayItemCH}
      />
      <QAndA product={selectedProduct} />
      <ReviewList
        product={selectedProduct}
        reviews={reviews}
        //overallRating={selectedProduct.starRating}
        reviewMeta={reviewMeta}
        // totalNumberOfRatings={selectedProduct.totalNumReviews}
      />
    </div>
  );
}

export default App;
