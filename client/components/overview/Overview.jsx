import React, { useState, useEffect } from 'react';
import Product from './product/Product'

const Overview = function() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [description, setDescription] = useState([]);
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      console.log('called fetch 1');
      const response = await fetch('/products');
      const json = await response.json();
      setProducts(json);

      setError(false);
      console.log('called fetch 2');
      const response2 = await fetch(`/products/${json[0].id}`);
      const json2 = await response2.json();
      setDescription(json2);

      console.log('called fetch 3');
      const response3 = await fetch(`/products/${json[0].id}/styles`);
      const json3 = await response3.json();
      setStyles(json3);
      setIsLoaded(true);
    }
    fetchProduct();
  }, []);

  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  // eslint-disable-next-line no-else-return
  } else if (!isLoaded) {
    return (
      <div>Loading...</div>
    );
  } else {
    console.log(products);
    console.log(description);
    console.log(styles);
    return (
      <div>
        <ul>
          {products.map((prod) => (
            <li key={prod.id}>{prod.name}<br></br>
              {prod.slogan}<br></br>
              {prod.category}<br></br>
              {prod.default_price}<br></br>
              {prod.description}<br></br>
              <ul>
                Features
                {description.features.map((feature, index) => (
                  <li key={index}>
                    {feature.feature}
                    : {feature.value}


                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default Overview;
