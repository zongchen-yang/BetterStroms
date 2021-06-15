import React from 'react';
import Rating from './Rating';

const RelatedItem = ({ item, showCompareCH, displayItemCH }) => (
  <div className="item">
    <img className="image" src={item.image} onClick={()=> displayItemCH(item.id)} />
    <i className="icon far fa-star fa-1x" onClick={() => {showCompareCH(item)}} />
    <div className="category">{item.category}</div>
    <div className="name" onClick={()=>setId(item.id)}>{item.name}</div>
    <div className="price">${item.default_price}</div>
    <Rating rating={item.rating} />
  </div>
);

export default RelatedItem;
