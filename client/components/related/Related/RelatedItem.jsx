import React from 'react';
import Rating from './Rating';

const RelatedItem = ({
  item, showCompareCH, displayItemCH, className,
}) => (
  <div className={className ? 'itemWithFourth' : 'item'}>
    <img className="image" src={item.image} onClick={() => displayItemCH(item.id)} />
    <i className="icon far fa-star fa-1x" onClick={() => { showCompareCH(item); }} />
    <div className="category">{item.category}</div>
    <div className="relatedName" onClick={() => displayItemCH(item.id)}>{item.name}</div>
    <div className="relatedPrice">
      {item.sale ? (
        <div className="redPrice">
          $
          {item.sale}
        </div>
      ) : null}
      <div className={item.sale ? 'cross-out' : null}>
        $
        {item.default_price}
      </div>
    </div>
    <Rating rating={item.rating} />
    <div className={className ? `${className.className} ` : null} />
  </div>
);

export default RelatedItem;
