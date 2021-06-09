import React, { useState, useEffect } from 'react';
import Compare from './Compare';

const fetch = require('node-fetch');

const RelatedItem = ({ product, id }) => {
  const [item, setItem] = useState({});
  const [showCompare, setShowCompare] = useState(false);

  const getItem = () => {
    if (id) {
      fetch(`http://localhost:3000/products/${id}`)
        .then((res) => res.json())
        .then((result) => setItem(result))
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    getItem();
  }, [id]);
  // get from styles to get images
  return (
    <div className="item" >
      <img className="image" src="https://source.unsplash.com/1600x900/?corgi"></img>
      <i className="icon far fa-star fa-1x" onClick={() => setShowCompare(true)} />
      <div className="category">{item.category}</div>
      <div className="name">{item.name}</div>
      <div className="price">${item.default_price}</div>
      <div className="rating" />
      <i className="fas fa-star" />
      <i className="fas fa-star" />
      <i className="fas fa-star" />
      <i className="fas fa-star" />
      <i className="fas fa-star" />
      {showCompare ? <Compare product={product} related={item} /> : null}
    </div>
  );
};

export default RelatedItem;
