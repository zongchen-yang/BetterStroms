import React from 'react';

function QuantSelector({ sku }) {
  let displayedQuantity = sku.quantity;
  const optionArray = [];
  if (displayedQuantity > 15) {
    displayedQuantity = 15;
  }
  if (sku.size === 'empty') {
    return (
      <span>
        <label htmlFor="quantity-select">
          Quantity:
          <select name="quantity" id="quantity-select" disabled>
            <option value="null">-</option>
          </select>
        </label>
      </span>
    );
  }
  for (let i = 1; i <= displayedQuantity; i += 1) {
    optionArray.push(<option key={i} value={i}>{i}</option>);
  }
  return (
    <span>
      <label htmlFor="quantity-select">
        Quantity:
        <select name="quantity" id="quantity-select">
          {optionArray}
        </select>
      </label>
    </span>
  );
}
export default QuantSelector;
