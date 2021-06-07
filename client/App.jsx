import React, { useState, useEffect } from 'react';
import QAndA from './components/qanda/QAndA';
import sampleData from '../sampleData';

const App = function() {
  const [product, setProduct] = useState('');

  useEffect(() => {
    // setProduct(product = sampleData.id);

    // console.log('logging state product id: ', { product });

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
      <div>
        <QAndA product={product} />
      </div>
    </div>
  );
};

export default App;
