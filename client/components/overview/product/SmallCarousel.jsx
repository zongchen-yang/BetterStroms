import React, { useState, useEffect } from 'react';

function SmallCarousel({ style, clickHandler, largePhotoIndex, expanded}) {
  const [startIndex, setStartIndex] = useState(0);
  const [upHidden, setUpHidden] = useState(false);
  const [downHidden, setDownHidden] = useState(false);
  const [changedPhoto, setChangedPhoto] = useState(false);

  let renderedPhotos;
  let hideSmCarousel = {
    display: 'flex',
  };

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
      let highlighted = 'small-carousel-image-container';
      if (index === largePhotoIndex) {
        highlighted = 'small-carousel-highlight small-carousel-image-container';
      }
      return (
        <div
          key={i++}
          className={highlighted}
          index={index}
          onClick={() => clickHandler(index)}
          onKeyPress={() => clickHandler(index)}
          role="presentation"
        >
          <img className="smallCarouselImages" alt={style.name} src={picObj.thumbnail_url} />
        </div>
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

  if (expanded) {
    hideSmCarousel = {
      display: 'none',
    };
  }

  makeRenderedPhotos();

  const downShevron = (
    <img src="assets/shevron_outlined.svg" alt="" focusable="false" />
  );

  return (
    <div id="smallCarouselContainer" style={hideSmCarousel}>
      <div id="sc-up-placeholder">
        <button id="sc-up" className="small-carousel-shevrons" hidden={upHidden} onClick={goUp} type="button">
          {downShevron}
        </button>
      </div>
      <div id="small-carousel-images-only">
        {renderedPhotos.slice(startIndex, (startIndex + max))}
      </div>
      <button id="small-carousel-down-button" className="small-carousel-shevrons" hidden={downHidden} onClick={goDown} type="button">
        {downShevron}
      </button>
    </div>
  );
}

export default SmallCarousel;
