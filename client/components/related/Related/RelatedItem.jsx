import React, { useState, useEffect } from 'react';
import Compare from './Compare';

const fetch = require('node-fetch');

const RelatedItem = ({ item, setShowCompare }) => (
  <div className="item">
    <img className="image" src={item.image}></img>
    <i className="icon far fa-star fa-1x" onClick={() => setShowCompare(true)} />
    <div className="category">{item.category}</div>
    <div className="name">{item.name}</div>
    <div className="price">${item.default_price}</div>
    <div className="rating">{item.rating.toFixed(2)}
      <i className="fas fa-star" />
      <i className="fas fa-star" />
      <i className="fas fa-star" />
      <i className="fas fa-star" />
      <i className="fas fa-star" />
    </div>
  </div>
);

export default RelatedItem;
