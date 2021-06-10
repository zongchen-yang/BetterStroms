import React, { useState, useEffect } from 'react';
import Carousel from './product/Carousel';
import Options from './product/Options';
import Description from './product/Description';
import SmallCarousel from './product/SmallCarousel';

function Overview({ product }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [selectedSku, setSelectedSku] = useState({ quantity: 0, size: 'empty' });

  useEffect(() => {
    setSelectedStyle(product.styleList[0]);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    setSelectedStyle(product.styleList[0]);
  }, [product]);

  function cartCH(event) {

  }

  function favoriteCH(event) {

  }

  function mainImageCH(direction) {
    // const { index } = product;
    let nextIndex = photoIndex;
    if (direction === 'right') {
      nextIndex += 1;
    } else {
      nextIndex -= 1;
    }
    if (nextIndex < 0) {
      nextIndex += selectedStyle.photos.length;
    }
    if (nextIndex >= selectedStyle.photos.length) {
      nextIndex = 0;
    }
    setPhotoIndex(nextIndex);
  }

  function sizeCH(event) {
    const skuInt = event.target.value;
    setSelectedSku(selectedStyle.skus[skuInt]);

    // setSelectedSku({ quantity: 0, size: 'empty' });
  }

  function styleCH(i) {
    setPhotoIndex(0);
    setSelectedStyle(product.styleList[i]);
    setSelectedSku({ quantity: 0, size: 'empty' });
  }

  function smallCarouselClickHandler(i) {
    setPhotoIndex(i);
  }

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
        <Carousel style={style} photoIndex={photoIndex} clickHandler={mainImageCH} />
        <Options product={product} sku={selectedSku} style={style} chs={clickHandlers} />
      </div>
      <Description product={product} />
    </div>
  );
}

export default Overview;

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
