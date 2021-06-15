import React, { useState, useEffect } from 'react';

const InventoryItem = ({ item, deleteCH }) => (
  <div className="item">
    <img className="image" src=""></img>
    <i className="icon far fa-times-circle fa-1x" onClick={()=> deleteCH(item)} />
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

export default InventoryItem;
