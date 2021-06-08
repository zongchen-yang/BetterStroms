import React from 'react';

function Options({ product, styles, style, clickHandler }) {
  return (
    <div id="options-container">
      <h3>{product.category}</h3>
      <h1>{product.name}</h1>
      <p>Price: {product.default_price} </p>
      <strong>Style</strong> {">"} Selected Style
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
      <label htmlFor="quantity-select">Quantity:</label>
      <select name="quantity" id="quantity-select">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <label htmlFor="size-select">Size:</label>
      <select name="size" id="size-select">
        {/* Object.keys returns an array = ['sku1', sku2', ...] */}
        {Object.keys(style.skus).map((skuIndex) => {
          const sku = parseInt(skuIndex);
          const currentSku = style.skus[sku];
          return (
            <option key={sku} value={currentSku.size}>{currentSku.size}</option>
          );
        })}
      </select>
    </div>
  );
}

export default Options;
