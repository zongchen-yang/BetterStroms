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
            <div
              onClick={() => clickHandler(index)}
              onKeyPress={() => clickHandler(index)}
              role="presentation"
            >
              <img alt="hi" width="50" height="100" src={picObj.thumbnail_url} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PhotoCarousel;
