import React from 'react';

function QuantSelector({ sku }) {
  let quant = sku.quantity;
  const optionArray = [];
  if (quant > 15) {
    quant = 15;
  }
  if (sku.size === 'empty') {
    return (
      <div>
        <label htmlFor="quantity-select">
          Quantity:
          <select name="quantity" id="quantity-select">
            <option value="null">-</option>
          </select>
        </label>
      </div>
    );
  }
  for (let i = 1; i <= quant; i += 1) {
    optionArray.push(<option key={i} value={i}>{i}</option>);
  }
  return (
    <div>
      <label htmlFor="quantity-select">
        Quantity:
        <select name="quantity" id="quantity-select">
          {optionArray}
        </select>
      </label>
    </div>
  );
}
export default QuantSelector