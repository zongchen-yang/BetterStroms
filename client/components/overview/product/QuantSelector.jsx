import React from 'react';

function QuantSelector({ sku } ) {
  if (sku === undefined) {
    return null;
  }
  let quant = sku.quantity;
  let optionArray = [];
  if (quant > 5) {
    quant = 5;
  }
  for (let i = 1; i <= quant; i += 1) {
    optionArray.push(<option key={i} value={i}>{i}</option>);
  }
  return (
    <div>
      <label htmlFor="quantity-select">Quantity:</label>
      <select name="quantity" id="quantity-select">
        {optionArray}
      </select>
    </div>
  );
}
export default QuantSelector