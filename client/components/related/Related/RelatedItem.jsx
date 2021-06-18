import React from 'react';
import Rating from './Rating';
import ClickTracking from '../../../WithClickTrackingEventHandler';

const RelatedItem = ({
  item, showCompareCH, displayItemCH, className
}) => (
  <div className={className ? 'itemWithFourth' : 'item'}>
    <ClickTracking element={`related item ${item.id}`} module="related">
      <img className="image" src={item.image} onClick={()=> displayItemCH(item.id)} />
    </ClickTracking>
    <ClickTracking element={`compare item ${item.id}`} module="related">
      <i className="icon far fa-star fa-1x" onClick={() => {showCompareCH(item)}} />
    </ClickTracking>
    <div className="category">{item.category}</div>
    <div className="name" onClick={()=>setId(item.id)}>{item.name}</div>
    <div className="price">
      {item.sale ? <div className={"redPrice"}>${item.sale} </div> : null}
      <div className={item.sale ? "cross-out" : null}>${item.default_price}</div>
    </div>
    <Rating rating={item.rating} />
    <div className={className ? `${className.className} ` : null} />
  </div>
);

export default RelatedItem;
