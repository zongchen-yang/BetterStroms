import React from 'react';
import ClickTracking from '../../../WithClickTrackingEventHandler';

function QuantSelector({ sku }) {
  let displayedQuantity = sku.quantity;
  const optionArray = [];
  if (displayedQuantity > 15) {
    displayedQuantity = 15;
  }
  if (sku.size === 'empty') {
    return (
      <span>
        <select className="select-dropdowns" name="quantity" id="quantity-select" disabled>
          <option value="null">-</option>
        </select>
      </span>
    );
  }
  for (let i = 1; i <= displayedQuantity; i += 1) {
    optionArray.push(<option key={i} value={i}>{i}</option>);
  }
  return (
    <span className="quant-select-wrapper">
      <div className="select-wrapper">
        <ClickTracking element="Select quantity dropdown" module="Overview">
          <select className="select-dropdowns" name="quantity" id="quantity-select">
            {optionArray}
          </select>
        </ClickTracking>
      </div>
    </span>
  );
}
export default QuantSelector;
