import React, { useState, useEffect } from 'react';
import Related from './components/related/Related/RelatedList';
import Inventory from './components/related/Inventory/InventoryList';

const fetch = require('node-fetch');

const App = () => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/products/20104')
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <p>Hello from App</p>
      <Related product={product} />
      <Inventory product={product} />
    </div>
  );
};

export default App;
