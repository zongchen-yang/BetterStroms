import React, { useState, useEffect } from 'react';
import ReviewList from './components/ratingsreviews/reviews/ReviewList';
import sampleData from './sampleData';

const App = function () {
  const [product, setProduct] = useState({});

  // useEffect(()=> {
  //   setProduct(productId = params.id)
  //   fetch()
  // })
  useEffect(() => {
    fetch('http://localhost:3000/products/20104')
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .then(console.log('logging state product id:', { product }))
      .catch((error) => console.log(error));
    console.log('hello from use effect');
  }, ['stop']);

  return (
    <div>
      <div>Hello from App</div>
      <ReviewList product={product} />
    </div>
  );
};

export default App;
