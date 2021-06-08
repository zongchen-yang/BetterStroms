import React from 'react';

function PhotoCarousel({ style }) {
  let i = 0;
  return (
    <div>
      <ul>
        {style.photos.map((picObj) => (
          <li key={i++}>
            <img alt="hi" width="50" height="50" src={picObj.thumbnail_url} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PhotoCarousel;
