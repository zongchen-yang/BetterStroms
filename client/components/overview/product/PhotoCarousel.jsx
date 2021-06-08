import React from 'react';

function PhotoCarousel({ style, clickHandler}) {
  let i = 0;
  if (style.photos === undefined) {
    return null;
  }
  return (
    <div>
      <ul>
        {style.photos.map((picObj, index) => (
          <li key={i++} index={index}>
            <img onClick={() => clickHandler(index)} alt="hi" width="50" height="100" src={picObj.thumbnail_url} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PhotoCarousel;
