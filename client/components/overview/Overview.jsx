import React, { useState, useEffect } from 'react';
import Carousel from './product/Carousel';
import Options from './product/Options';
import Description from './product/Description';
import SmallCarousel from './product/SmallCarousel';

function Overview({products, selected, ch}) {
  // const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [products, setProducts] = useState([]);
  // const [index, setIndex] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [styleIndex, setStyleIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [selectedSku, setSelectedSku] = useState(null);
  const selectedProduct = selected;
  const productClickHandler = ch;

  useEffect(() => {
    setSelectedStyle(selectedProduct);
    setIsLoaded(true);
    // async function fetchProduct() {
    //   const response = await fetch('/products?count=20');
    //   const productArray = await response.json();
    //   console.log(productArray);

    //   const results = productArray.map(async (product) => {
    //     let idQueryReponse = await fetch(`/products/${product.id}`);
    //     idQueryReponse = await idQueryReponse.json();
    //     product.features = idQueryReponse.features;
    //     console.log(idQueryReponse);

    //     let stylesQueryResponse = await fetch(`/products/${product.id}/styles`);
    //     stylesQueryResponse = await stylesQueryResponse.json();
    //     product.styles = stylesQueryResponse.results;
    //     console.log(stylesQueryResponse);
    //     return product;
    //   });
    //   const resolvedProducts = await Promise.all(results);
    //   setProducts(resolvedProducts);
    //   setError(false);
    //   setIsLoaded(true);
    // }
    // fetchProduct();
  }, []);

  function cartCH(event) {

  }

  function favoriteCH(event) {

  }

  function sizeCH(event) {
    const selectedSize = event.target.value;
    let currentSku;
    selectedStyle.skus.forEach( (sku) => {
      if (sku.size === selectedSize) {
        currentSku = sku;
      }
    });
    if (currentSku) {
      setSelectedSku(currentSku);
    } else {
      setSelectedSku({ quantity: 0, size: 'empty' });
    }
  }

  function styleCH(i) {
    setPhotoIndex(0);
    setSelectedStyle(selectedProduct[i]);
    setSelectedSku({ quantity: 0, size: 'empty' });
  }

  function smallCarouselClickHandler(i) {
    setPhotoIndex(i);
  }

  // console.log(products);
  const product = selectedProduct;
  const style = selectedStyle;
  const clickHandlers = {
    styleCH,
    sizeCH,
    cartCH,
    favoriteCH,
  };
  if (!isLoaded) {
    return <div>Loading overview...</div>;
  }
  return (
    <div>
      <div id="overviewContainer">
        <SmallCarousel style={style} clickHandler={smallCarouselClickHandler} />
        <Carousel style={style} photoIndex={photoIndex} clickHandler={productClickHandler} />
        <Options product={product} sku={selectedSku} style={style} chs={clickHandlers} />
      </div>
      <Description product={product} />
    </div>
  );
}

export default Overview;
