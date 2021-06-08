import React from 'react';

function PhotoCarousel({ style }) {
  let i = 0;
  if (style.photos === undefined) {
    return null;
  }
  return (
    <div>
      <ul>
        {style.photos.map((picObj) => (
          <li key={i++}>
            <img alt="hi" width="75" height="150" src={picObj.thumbnail_url} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PhotoCarousel;
