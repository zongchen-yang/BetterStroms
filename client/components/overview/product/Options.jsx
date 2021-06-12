import React from 'react';
import QuantSelector from './QuantSelector';

//         <Options product={product} sku={selectedSku} style={style} chs={clickHandlers} />

function Options({ product, sku, style, chs }) {
  const {
    styleCH, sizeCH, cartCH, favoriteCH
  } = chs;
  const { styleList } = product;
  let favoriteButton;
  let inStock = true;
  let totalQuantity = 0;
  let sizeSelect;
  let cartButton;

  function optionsCartHandler() {
    if (sku.size === 'empty') {
      document.getElementById('size-select').focus();
      document.getElementById('size-select').click();
      // defaultMenuIsOpen={true}
    } else {
      sizeCH();
    }
  }

  if (style.skus) {
    Object.keys(style.skus).forEach((key) => { totalQuantity += style.skus[key].quantity; });
  }
  if (totalQuantity === 0) {
    inStock = false;
  }

  if (style.isFavorite) {
    favoriteButton = <button type="button" onClick={() => favoriteCH(style)}>Heart</button>;
  } else {
    favoriteButton = <button type="button" onClick={() => favoriteCH(style)}>Star</button>;
  }

  if (inStock) {
    cartButton = <button type="button" onClick={optionsCartHandler}>Add to Cart</button>;
    sizeSelect = (
      <select onChange={(e) => sizeCH(e)} name="size" id="size-select">
        <option value="disabled">Select Size</option>
        {/* Object.keys returns an array = ['sku1', sku2', ...] */}
        {Object.keys(style.skus).map((currentSkuString) => {
          const skuInt = parseInt(currentSkuString, 10);
          const skuObj = style.skus[skuInt];
          if (skuObj === undefined) {
            return null;
          }
          return (
            <option key={skuInt} value={skuInt}>{skuObj.size}</option>
          );
        })}
      </select>
    );
  } else {
    cartButton = <button hidden type="button" onClick={cartCH}>Add to Cart</button>;
    sizeSelect = (
      <select name="size" id="size-select">
        <option value="disabled" disabled>OUT OF STOCK</option>
      </select>
    );
  }

  return (
    <div id="options-container">
      <span>Stars {product.starRating}</span>
      <button type="button">
        Read All
        {' '}
        {product.totalNumReviews}
        {' '}
        Reviews
      </button>
      <h3>{product.category}</h3>
      <h1>{product.name}</h1>
      <p>
        Price:
        {product.default_price}
      </p>
      <strong>Style</strong>
      {'>'}
      {style.name}
      <div id="stylesContainer">
        {styleList.map((aStyle, index) => (
          <div
            key={aStyle.id}
            index={index}
            onClick={() => styleCH(index)}
            onKeyPress={() => styleCH(index)}
            role="presentation"
          >
            <img alt={aStyle.name} height="150" width="75" src={aStyle.photos[0].thumbnail_url} />
          </div>
        ))}
      </div>
      <form>
        <label htmlFor="size-select">
          Size:
          {sizeSelect}
        </label>
        <QuantSelector sku={sku} />
        {cartButton}
        {favoriteButton}
      </form>
    </div>
  );
}

export default Options;
