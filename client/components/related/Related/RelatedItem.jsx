import React, { useState, useEffect } from 'react';

const RelatedItem = ({ item, showCompareCH }) => (
  <div className="item">
    <img className="image" src={item.image}></img>
    <i className="icon far fa-star fa-1x" onClick={() => showCompareCH(item)} />
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
