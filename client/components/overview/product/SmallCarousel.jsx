import React, { useState, useEffect } from 'react';

function SmallCarousel({ style, clickHandler}) {
  const [startIndex, setStartIndex] = useState(0);
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

  // useEffect(() => {

  // }, []);
  const renderedPhotos = style.photos.map((picObj, index) => (
    <div key={i++} index={index}>
      <div
        onClick={() => clickHandler(index)}
        onKeyPress={() => clickHandler(index)}
        role="presentation"
      >
        <img alt={style.name} width="50" height="100" src={picObj.thumbnail_url} />
      </div>
    </li>
  ));
  return (
    <div>
      <button onClick={goUp} type="button">up</button>
      <ul>
        {renderedPhotos.concat(renderedPhotos).slice(startIndex, (startIndex + max))}
      </ul>
      <button onClick={goDown} type="button">down</button>
    </div>
  );
}

export default SmallCarousel;
