import React, { useState, useEffect } from 'react';
import Rating from '../Related/Rating';

const InventoryItem = ({ item, displayItemCH, deleteCH, className }) => (
  <div className={className ? 'itemWithFourth' : 'item'}>
    <a href="#announcement"><img className="image" src={item.style.photos[0].url} href="#announcement" onClick={()=>displayItemCH(item.id)}></img></a>
    <i className="icon far fa-times-circle fa-1x" onClick={()=> deleteCH(item, item.style)} />
    <div className="category">{item.category}</div>
    <div className="name">{item.name}</div>
    <div className="price">
      {item.style.sale_price ? <div className="redPrice">${item.style.sale_price}</div> : null}
      <div className={item.style.sale_price ? "cross-out" : null}>${item.default_price}</div>
    </div>
    <Rating rating={item.starRating} />
    <div className={className ? `${className.className} ` : null} />
  </div>
);

export default InventoryItem;
