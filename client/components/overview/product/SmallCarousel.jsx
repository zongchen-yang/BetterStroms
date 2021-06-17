import React, { useState, useEffect } from 'react';

function SmallCarousel({ style, clickHandler, largePhotoIndex}) {
  const [startIndex, setStartIndex] = useState(0);
  const [upHidden, setUpHidden] = useState(false);
  const [downHidden, setDownHidden] = useState(false);
  const [changedPhoto, setChangedPhoto] = useState(false);
  let renderedPhotos;

  if (style.photos === undefined) {
    return null;
  }

  let max = 7;
  const numberOfPhotos = style.photos.length
  if (numberOfPhotos < max) {
    max = numberOfPhotos;
  }
  let i = 0;
  function goUp() {
    // if (numberOfPhotos <= 7) {
    //   return;
    // }
    let nextStartIndex = startIndex - 1;
    if (nextStartIndex < 0) {
      nextStartIndex += numberOfPhotos;
    }
    setStartIndex(nextStartIndex);
  }
  function goDown() {
    // if (numberOfPhotos <= 7) {
    //   return;
    // }
    let nextStartIndex = startIndex + 1;
    if (nextStartIndex === numberOfPhotos) {
      nextStartIndex = 0;
    }
    setStartIndex(nextStartIndex);
  }
  function makeRenderedPhotos() {
    renderedPhotos = style.photos.map((picObj, index) => {
      let highlighted = '';
      if (index === largePhotoIndex) {
        highlighted = 'small-carousel-highlight';
      }
      return (
        <span
          key={i++}
          className={highlighted}
          index={index}
          onClick={() => clickHandler(index)}
          onKeyPress={() => clickHandler(index)}
          role="presentation"
        >
          <img className="smallCarouselImages" alt={style.name} src={picObj.thumbnail_url} />
        </span>
      );
    });
  }

  useEffect(() => {
    if (largePhotoIndex - startIndex < 0) {
      setStartIndex(startIndex - 1);
    }
    if (largePhotoIndex - startIndex > 6) {
      setStartIndex(startIndex + 1);
    }
    makeRenderedPhotos();
    setChangedPhoto(!changedPhoto);
  }, [largePhotoIndex]);

  useEffect(() => {
    if (startIndex === 0 || max < 7) {
      setUpHidden(true);
    } else {
      setUpHidden(false);
    }
    if (startIndex === style.photos.length - 7 || max < 7) {
      setDownHidden(true);
    } else {
      setDownHidden(false);
    }
  }, [startIndex]);

  makeRenderedPhotos();
  const downShevron = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="9px" focusable="false">
      <path id="_x3C_Group_x3E__4_" d="M8.002 8L1 1m7.002 7L15 1.004" />
    </svg>
  );
  return (
    <div id="smallCarouselContainer">
      <button id="sc-up" className="carousel-shevrons" hidden={upHidden} onClick={goUp} type="button">
        {downShevron}
      </button>
      {renderedPhotos.slice(startIndex, (startIndex + max))}
      <button className="carousel-shevrons" hidden={downHidden} onClick={goDown} type="button">
        {downShevron}
      </button>
    </div>
  );
}

export default SmallCarousel;