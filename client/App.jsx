import React, { useState, useEffect } from 'react';
import Related from './components/related/Related/RelatedList';
import Inventory from './components/related/Inventory/InventoryList';
import QAndA from './components/qanda/QAndA';
import ReviewComponents from './components/ratingsreviews/reviews/ReviewComponents';
import Overview from './components/overview/Overview';
import Announcement from './components/annoucements/Announcements';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}

function App() {
  const [id, setId] = useState(20852);
  const [selectedProduct, setSelectedProduct] = useState();
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [reviews, setReviews] = useState([]);
  const [reviewMeta, setReviewMeta] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [theme, setTheme] = useState(true);

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
    const total = Object.keys(obj.ratings).reduce((accumRating, curr) => accumRating + parseInt(curr) * parseInt(obj.ratings[curr]), 0);
    const amount = Object.values(obj.ratings).reduce((accum, curr) => accum + parseInt(curr), 0);
    fetchProduct.totalNumReviews = amount;
    return (total / amount) || 0;
  };

  const displayItemCH = (num) => {
    setIsLoaded(false);
    setId(num);
  };

  const getRatings = async (fetchProduct) => {
    let rating = await fetch(`/reviews/meta?product_id=${id}`);
    rating = await rating.json();
    setReviewMeta(rating);
    rating = calculateRating(rating, fetchProduct);
    fetchProduct.starRating = {
      whole: Math.floor(rating),
      part: `${Math.round(((rating - Math.floor(rating)) * 4)) * 25}%`,
    };
  };

  function favoriteCH(product, style) {
    style.isFavorite = true;
    const temp = { ...product };
    temp.style = style;
    setFavorites([...favorites, temp]);
  }

  const deleteFavoriteCH = (item, style) => {
    const theStyle = item.style || style;
    theStyle.isFavorite = false;
    const copy = favorites.slice();
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].style.id === theStyle.id && copy[i].id === item.id) {
        copy.splice(i, 1);
        break;
      }
    }
    setFavorites(copy);
  };

  async function cartCH(sku, quantity) {
    console.log(`added ${quantity} of item with sku ${sku.value} to cart`);
    const skuInt = parseInt(sku.value, 10);
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

  const toggleColors = () => {
    const root = document.documentElement;

    if (theme) {
      root.style.setProperty('background-color', 'black');
      root.style.setProperty('color', 'whitesmoke');
      setTheme(false);
    } else {
      root.style.setProperty('background-color', 'whitesmoke');
      root.style.setProperty('color', 'black');
      setTheme(true);
    }
  };

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
      <Announcement />
      <button type="button" id="toggle-theme" onClick={toggleColors}>toggle</button>
      <Overview
        product={selectedProduct}
        favoriteCH={favoriteCH}
        cartCH={cartCH}
        deleteFavoriteCH={deleteFavoriteCH}
      />
      <Related product={selectedProduct} displayItemCH={displayItemCH} />
      <Inventory
        favorites={favorites}
        deleteFavoriteCH={deleteFavoriteCH}
        displayItemCH={displayItemCH}
      />
      <QAndA product={selectedProduct} theme={theme} />
      <ReviewComponents
        product={selectedProduct}
        reviews={reviews}
        reviewMeta={reviewMeta}
        theme={theme}
      />
    </div>
  );
}

export default App;
