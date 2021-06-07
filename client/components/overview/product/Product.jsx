import React, { useState } from 'react';

function Product({ styles }) {
  let [index, setIndex] = useState(0);
  function goLeft() {
    if (index === 0) {
      setIndex(styles.results.length - 1);
    } else {
      setIndex(index--);
    }
  }
  function goRight() {
    if (index === styles.results.length - 1) {
      setIndex(0);
    } else {
      setIndex(index++);
    }
  }
  return (
    <div>
      <button onClick={goLeft}>left</button>
      <img alt="hi" height="300" width="200" src={styles.results[index].photos[0].url} />
      <button onClick={goRight}>right</button>
    </div>
  )
}

export default Product;