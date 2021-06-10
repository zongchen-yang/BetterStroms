import React, { useState, useEffect } from 'react';
import Carousel from './product/Carousel';
import Options from './product/Options';
import Description from './product/Description';
import SmallCarousel from './product/SmallCarousel';

function Overview({products, selected, ch}) {
  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [selecetedStyle, setSelectedStyle] = useState(0);
  const [styleIndex, setStyleIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [selectedSku, setselectedSku] = useState(null);
  const selectedProduct = selected;
  const productClickHandler = ch;

  useEffect(() => {
    setSelectedStyle(selectedProduct[0])
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
    })
    if (currentSku) {
      selectedSku(sku);
    } else {
      selectedSku({ quantity: 0, size: 'empty' });
    }
  }

  function styleCH(i) {
    setPhotoIndex(0);
    setStyleIndex(i);
    selectedSku({ quantity: 0, size: 'empty' });
  }

  function smallCarouselClickHandler(i) {
    setPhotoIndex(i);
  }

  if (!isLoaded) {
    return (
      <div>Loading...</div>
    );
  }
    // console.log(products);
    const product = selectedProduct;
    const style = selectedStyle;
    const optionsInput = {
      product,
      selectedSku,
      style,
      styleCH,
      sizeCH,
      cartCH,
      favoriteCH,
    };
    return (
      <div>
        <div id="overviewContainer">
          <SmallCarousel style={style} clickHandler={smallCarouselClickHandler} />
          <Carousel style={style} photoIndex={photoIndex} clickHandler={productClickHandler} />
          <Options inputObj={optionsInput} />
        </div>
        <Description slogan={product.slogan} text={product.description} feat={product.features} />
      </div>
    );
  }
}

export default Overview;
