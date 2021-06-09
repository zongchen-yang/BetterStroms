import React from 'react';
import QuantSelector from './QuantSelector';

function Options({ inputObj }) {
  const {
    product, style, styleCH, sizeCH, selectedSku, cartCH, favoriteCH
  } = inputObj;
  const { styles } = product;
  return (
    <div id="options-container">
      <span>Stars</span>
      <a href="">Read All # Reviews</a>
      <h3>{product.category}</h3>
      <h1>{product.name}</h1>
      <p>
        Price:
        {product.default_price}
      </p>
      <strong>Style</strong>
      {'>'}
      {style.name}
      <table>
        <tbody>
          <tr>
            {styles.map((aStyle, index) => (
              <td key={aStyle.style_id} index={index}>
                <div
                  onClick={() => styleCH(index)}
                  onKeyPress={() => styleCH(index)}
                  role="presentation"
                >
                  <img alt={aStyle.name} height="150" width="75" src={aStyle.photos[0].thumbnail_url} />
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <form>
        <label htmlFor="size-select">
          Size:
          <select onChange={(e) => sizeCH(e)} name="size" id="size-select">
            <option value="">Select Size</option>
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
        </label>
        <QuantSelector sku={selectedSku} />
        <button type="button" onClick={cartCH}>Add to Cart</button>
        <button type="button" onClick={favoriteCH}>Favorite</button>
      </form>
    </div>
  );
}

export default Options;
