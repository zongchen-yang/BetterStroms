import React from 'react';
import Rating from './Rating';

const RelatedItem = ({ item, showCompareCH }) => (
  <div className="item">
    <img className="image" src={item.image}></img>
    <i className="icon far fa-star fa-1x" onClick={() => {showCompareCH(item); console.log('inside item: clicked')}} />
    <div className="category">{item.category}</div>
    <div className="name">{item.name}</div>
    <div className="price">${item.default_price}</div>
    <Rating rating={item.rating} />
  </div>
);

export default RelatedItem;
