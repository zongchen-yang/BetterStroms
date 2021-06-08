import React, { useState } from 'react';
import QuantSelector from './QuantSelector';

function Options({ product, styles, style, clickHandler }) {
  const defaultStyleSku = Object.keys(style.skus)[0];
  const [skuState, setSkuState] = useState(defaultStyleSku);
  function sizeCH(event) {
    console.log(skuState);
    const currentSku = event.target.value;
    setSkuState(currentSku);
    console.log(style.name, style.skus[currentSku]);
  }

  return (
    <div id="options-container">
      <h3>{product.category}</h3>
      <h1>{product.name}</h1>
      <p>Price: {product.default_price} </p>
      <strong>Style</strong> {">"} {style.name}
      <table>
        <tbody>
          <tr>
            {styles.map((style, index) => (
              <td key={index} index={index}>
                <img onClick={() => clickHandler(index)} alt="hi" height="150" width="75" src={style.photos[0].thumbnail_url} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <form>
        <label htmlFor="size-select">Size:</label>
        <select onChange={(e) => sizeCH(e)} name="size" id="size-select">
          {/* Object.keys returns an array = ['sku1', sku2', ...] */}
          {Object.keys(style.skus).map((skuIndex) => {
            const sku = parseInt(skuIndex, 10);
            const currentSku = style.skus[sku];
            if (currentSku === undefined) {
              return null;
            }
            return (
              <option key={sku} value={sku}>{currentSku.size}</option>
            );
          })}
        </select>
        <QuantSelector sku={style.skus[skuState]} />
      </form>
    </div>
  );
}

export default Options;
