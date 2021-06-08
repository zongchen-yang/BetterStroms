import React, { useState } from 'react';

function Carousel({ style, photoIndex, clickHandler }) {
  return (
    <div>
      <button onClick={() => clickHandler('left')}>left</button>
      <img alt="hi" height="300" width="200" src={style.photos[photoIndex].url} />
      <button onClick={() => clickHandler('right')}>right</button>
    </div>
  );
}

export default Carousel;
