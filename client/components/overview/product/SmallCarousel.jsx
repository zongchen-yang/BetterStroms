import React, { useState, useEffect } from 'react';

function SmallCarousel({ style, clickHandler}) {
  const [startIndex, setStartIndex] = useState(0);
  const [upHidden, setUpHidden] = useState(false);
  const [downHidden, setDownHidden] = useState(false);
  let buttonUp;
  let buttonDown;
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

  const renderedPhotos = style.photos.map((picObj, index) => (
    <span
      key={i++}
      index={index}
      onClick={() => clickHandler(index)}
      onKeyPress={() => clickHandler(index)}
      role="presentation"
    >
      <img className="smallCarouselImages" alt={style.name} src={picObj.thumbnail_url} />
    </span>
  ));

  useEffect(() => {
    if (startIndex === 0 || max < 7) {
      setUpHidden(true);
    } else {
      setUpHidden(false);
    }
    if (startIndex === style.photos.length - 1 || max < 7) {
      setDownHidden(true);
    } else {
      setDownHidden(false);
    }
  }, [startIndex]);

  // if (startIndex === style.photos.length || max < 7) {
  //   setDownHidden(false);
  // } else
  // }

  return (
    <div id="smallCarouselContainer">
      <button hidden={upHidden} onClick={goUp} type="button">up</button>;
      {renderedPhotos.concat(renderedPhotos).slice(startIndex, (startIndex + max))}
      <button hidden={downHidden} onClick={goDown} type="button">down</button>;
    </div>
  );
}

export default SmallCarousel;
