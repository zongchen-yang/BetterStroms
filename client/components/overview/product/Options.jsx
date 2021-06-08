import React from 'react';
import QuantSelector from './QuantSelector';

function Options({ product, style, styleCH, sizeCH, selectedSku }) {
  const styles = product.styles;
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
                <img onClick={() => styleCH(index)} alt="hi" height="150" width="75" src={style.photos[0].thumbnail_url} />
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
        <QuantSelector sku={style.skus[selectedSku]} />
      </form>
    </div>
  );
}

export default Options;
