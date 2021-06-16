import React, { useState, useEffect } from 'react';
import Rating from '../Related/Rating';

const InventoryItem = ({ item, deleteCH, className }) => (
  <div className={className ? 'itemWithFourth' : 'item'}>
    <img className="image" src={item.style.photos[0].url}></img>
    <i className="icon far fa-times-circle fa-1x" onClick={()=> deleteCH(item, item.style)} />
    <div className="category">{item.category}</div>
    <div className="name">{item.name}</div>
    <div className="price">${item.default_price}</div>
    <Rating rating={item.starRating} />
    <div className={className ? `${className.className} ` : null} />
  </div>
);

export default InventoryItem;
