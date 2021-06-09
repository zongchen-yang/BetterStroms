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
  const [skuState, setSkuState] = useState({ quantity: 0, size: 'empty' });

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch('/products');
      const productArray = await response.json();

      const results = productArray.map(async (product) => {
        let idQueryReponse = await fetch(`/products/${product.id}`);
        idQueryReponse = await idQueryReponse.json();
        product.features = idQueryReponse.features;

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

  function sizeCH(event) {
    const currentSku = event.target.value;
    setSkuState(currentSku);
  }

  function productClickHandler(direction) {
    if (direction === 'right') {
      if (index === products.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    } else if (index === 0) {
      setIndex(products.length - 1);
    } else {
      setIndex(index - 1);
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
    // console.log(products);
    const product = products[index];
    const style = product.styles[styleIndex];
    const selectedSku = style.skus[skuState] || skuState;
    const optionsInput = {
      product,
      selectedSku,
      style,
      styleCH,
      sizeCH,
    };
    return (
      <div>
        <div id="overviewContainer">
          <PhotoCarousel style={style} clickHandler={photoCarouselClickHandler} />
          <Carousel style={style} photoIndex={photoIndex} clickHandler={productClickHandler} />
          <Options inputObj={optionsInput} />
        </div>
        <Description slogan={product.slogan} text={product.description} />
      </div>
    );
  }
};

export default Overview;
