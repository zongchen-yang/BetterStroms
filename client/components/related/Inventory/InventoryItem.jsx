import React, { useState, useEffect } from 'react';

const fetch = require('node-fetch');

const InventoryItem = ({ id }) => {
  const [item, setItem] = useState({});

  const getItem = () => {
    if (id) {
      fetch(`http://localhost:3000/products/${id}`)
        .then((res) => res.json())
        .then((product) => setItem(product))
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    getItem();
  }, [id]);

  return (
    <div className="item" >
      <img className="image" src="https://source.unsplash.com/1600x900/?corgi"></img>
      <i className="icon far fa-times-circle fa-1x"></i>
      <div className="category">{item.category}</div>
      <div className="name">{item.name}</div>
      <div className="price">${item.default_price}</div>
      <div className="rating" />
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
    </div>
  );
};

export default InventoryItem;
