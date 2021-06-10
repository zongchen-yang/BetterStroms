import React from 'react';
import QuantSelector from './QuantSelector';

//         <Options product={product} sku={selectedSku} style={style} chs={clickHandlers} />

function Options({ product, sku, style, chs }) {
  const {
    styleCH, sizeCH, cartCH, favoriteCH
  } = chs;
  const { styleList } = product;
  return (
    <div id="options-container">
      <span>Stars {product.starRating}</span>
      <button>Read All {product.totalNumReviews} Reviews</button>
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
            {styleList.map((aStyle, index) => (
              <td key={aStyle.id} index={index}>
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
            {Object.keys(style.skus).map((currentSkuString) => {
              const currentSkuInt = parseInt(currentSkuString, 10);
              const currentSkuObj = style.skus[currentSkuInt];
              if (currentSkuObj === undefined) {
                return null;
              }
              return (
                <option key={currentSkuInt} value={currentSkuInt}>{currentSkuObj.size}</option>
              );
            })}
          </select>
        </label>
        <QuantSelector sku={sku} />
        <button type="button" onClick={cartCH}>Add to Cart</button>
        <button type="button" onClick={favoriteCH}>Favorite</button>
      </form>
    </div>
  );
}

export default Options;
