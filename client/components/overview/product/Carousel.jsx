import React, { useState } from 'react';

function Carousel({ products }) {
  let [index, setIndex] = useState(0);
  function goLeft(e) {
    e.preventDefault();
    console.log('clicked left')
    if (index === 0) {
      setIndex(products.length - 1);
    } else {
      setIndex(index - 1);
    }
  }
  function goRight(e) {
    e.preventDefault();
    console.log('clicked right')
    if (index === products.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }
  return (
    <div>
      <button onClick={(e) => goLeft(e)}>left</button>
      <img alt="hi" height="300" width="200" src={products[index].styles[0].photos[0].url} />
      <button onClick={(e) => goRight(e)}>right</button>
    </div>
  )
}

export default Carousel;