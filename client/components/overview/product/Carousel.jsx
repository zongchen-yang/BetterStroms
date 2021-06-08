import React, { useState } from 'react';

function Carousel({ style, clickHandler }) {
  return (
    <div>
      <button onClick={() => clickHandler('left')}>left</button>
      <img alt="hi" height="300" width="200" src={style.photos[0].url} />
      <button onClick={() => clickHandler('right')}>right</button>
    </div>
  );
}

export default Carousel;
