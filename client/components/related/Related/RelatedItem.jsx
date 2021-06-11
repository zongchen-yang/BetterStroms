import React from 'react';

const RelatedItem = ({ item, showCompareCH }) => (
  <div className="item">
    <img className="image" src={item.image}></img>
    <i className="icon far fa-star fa-1x" onClick={() => showCompareCH(item)} />
    <div className="category">{item.category}</div>
    <div className="name">{item.name}</div>
    <div className="price">${item.default_price}</div>
    <div>
      <div className="shownRating">
        {[...Array(item.rating.whole)].map(() => <div><i className="fas fa-star" /></div>)}
        <div><i className="fas fa-star" style={{ width: item.rating.part, overflow: 'hidden' }} /></div>
      </div>
      <div className="hiddenRating">
        {[...Array(5)].map(() => <i className="far fa-star" />)}
      </div>
    </div>
  </div>
);

export default RelatedItem;
