import React, { useState, useEffect } from 'react';
import Carousel from './product/Carousel';
import Options from './product/Options';
import Description from './product/Description';
import PhotoCarousel from './product/PhotoCarousel';

const Overview = function() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [styleIndex, setStyleIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      console.log('called fetch 1');
      const response = await fetch('/products');
      const productArray = await response.json();

      const results = productArray.map(async (product) => {
        console.log('called fetch products by ID');
        let idQueryReponse = await fetch(`/products/${product.id}`);
        idQueryReponse = await idQueryReponse.json();
        product.features = idQueryReponse.features;

        console.log('called fetch styles');
        let stylesQueryResponse = await fetch(`/products/${product.id}/styles`);
        stylesQueryResponse = await stylesQueryResponse.json();
        product.styles = stylesQueryResponse.results;
        return product;
      });
      const resolvedProducts = await Promise.all(results);
      setProducts(resolvedProducts);
      setError(false);
      setIsLoaded(true);
    }
    fetchProduct();
  }, []);

  function productClickHandler(direction) {
    if (direction === 'right') {
      if (index === products.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    } else {
      if (index === 0) {
        setIndex(products.length - 1);
      } else {
        setIndex(index - 1);
      }
    }
    setPhotoIndex(0);
    setStyleIndex(0);
  }

  function styleCH(i) {
    setStyleIndex(i);
  }

  function photoCarouselClickHandler(i) {
    setPhotoIndex(i);
  }

  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  // eslint-disable-next-line no-else-return
  } else if (!isLoaded) {
    return (
      <div>Loading...</div>
    );
  } else {
    console.log(products);
    const product = products[index];
    const style = product.styles[styleIndex];
    return (
      <div>
        <div id="overviewContainer">
          <PhotoCarousel style={style} clickHandler={photoCarouselClickHandler} />
          <Carousel style={style} photoIndex={photoIndex} clickHandler={productClickHandler} />
          <Options product={product} styles={product.styles} style={style} clickHandler={styleCH} />
        </div>
        <Description slogan={product.slogan} text={product.description} />
      </div>
    );
  }
};

export default Overview;
