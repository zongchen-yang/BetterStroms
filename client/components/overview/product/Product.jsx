import React from 'react';

function Product({ styles }) {
  return (
    <div>
      <img src={styles.results[0].photos[0].url}></img>
    </div>
  )
}

export default Product;