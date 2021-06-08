import React, { useState } from 'react';

function Carousel({ products }) {
  let [index, setIndex] = useState(0);
  function goLeft() {
    if (index === 0) {
      setIndex(products.length - 1);
    } else {
      setIndex(index - 1);
    }
  }
  function goRight() {
    if (index === products.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }
  return (
    <div>
      <button onClick={goLeft}>left</button>
      <img alt="hi" height="300" width="200" src={products[index].styles[0].photos[0].url} />
      <button onClick={goRight}>right</button>
    </div>
  )
}

export default Carousel;