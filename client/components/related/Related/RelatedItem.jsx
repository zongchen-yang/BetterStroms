import React, { useState, useEffect } from 'react';
import Compare from './Compare';

const fetch = require('node-fetch');

const RelatedItem = ({ product, id }) => {
  const [item, setItem] = useState({});
  const [showCompare, setShowCompare] = useState(false);
  const [image, setImage] = useState();

  const getItem = () => {
    if (id) {
      fetch(`http://localhost:3000/products/${id}`)
        .then((res) => res.json())
        .then((result) => setItem(result))
        .catch((error) => console.log(error));
    }
  };

  const getImage = () => {
    fetch(`/products/${id}/styles`)
      .then((res) => res.json())
      .then((result) => setImage(result.results[0].photos[0].url))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getItem();
    getImage();
  }, [id]);

  return (
    <div className="item" >
      <img className="image" src={image}></img>
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
