import React, { useState, useEffect } from 'react';
import Carousel from './product/Carousel';
import Options from './product/Options';
import Description from './product/Description';
import SmallCarousel from './product/SmallCarousel';

function Overview({ product, favoriteCH, cartCH, deleteFavoriteCH }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [selectedSku, setSelectedSku] = useState({ quantity: 0, size: 'empty', value: 0 });

  useEffect(() => {
    setSelectedStyle(product.styleList[0]);
    setIsLoaded(true);
  }, [product]);

  function mainImageCH(direction) {
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
    selectedStyle.lastViewedIndex = nextIndex;
  }

  function sizeCH(skuValue) {
    if (skuValue === 'disabled') {
      setSelectedSku({ quantity: 0, size: 'empty', value: 0 });
      return null;
    }
    selectedStyle.skus[skuValue].value = skuValue;
    setSelectedSku(selectedStyle.skus[skuValue]);
  }

  function styleCH(i) {
    setPhotoIndex(product.styleList[i].lastViewedIndex);
    setSelectedStyle(product.styleList[i]);
    setSelectedSku({ quantity: 0, size: 'empty', value: 0 });
  }

  function smallCarouselCH(i) {
    setPhotoIndex(i);
    selectedStyle.lastViewedIndex = i;
  }

  const style = selectedStyle;
  const clickHandlers = {
    styleCH,
    sizeCH,
    cartCH,
    favoriteCH,
    deleteFavoriteCH,
  };
  if (!isLoaded) {
    return <div>Loading overview...</div>;
  }
  return (
    <div id="overview">
      <div id="overviewContainer">
        <div id="overview-main">
          <SmallCarousel
            style={style}
            clickHandler={smallCarouselCH}
            largePhotoIndex={photoIndex}
          />
          <Carousel style={style} photoIndex={photoIndex} clickHandler={mainImageCH} />
        </div>
        <div id="options-master">
          <Options product={product} sku={selectedSku} style={style} chs={clickHandlers} />
        </div>
      </div>
      <Description product={product} />
    </div>
  );
}

export default Overview;