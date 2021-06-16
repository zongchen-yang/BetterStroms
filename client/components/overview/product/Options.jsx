import React, { useState, useEffect } from 'react';
import QuantSelector from './QuantSelector';
import Ovrating from './Ovrating';

function Options({ product, sku, style, chs }) {
  const [sizeNotSelected, setSizeNotSelected] = useState(false);
  const [cartClicked, setCartClicked] = useState(false);
  const {
    styleCH, sizeCH, cartCH, favoriteCH
  } = chs;
  const { styleList } = product;
  let favoriteButton;
  let inStock = true;
  let totalQuantity = 0;
  let sizeSelect;
  let cartButton;
  let sizeSelectWarning;
  let price;

  useEffect(() => {
    setCartClicked(false);
  }, [style]);

  function optionsCartHandler() {
    if (sku.size === 'empty') {
      setSizeNotSelected(true);
      setCartClicked(true);
    } else {
      const quantSelector = document.getElementById('quantity-select');
      const quantValue = quantSelector.value;
      setSizeNotSelected(false);
      cartCH(sku, quantValue);
      setCartClicked(false);
    }
  }

  function sizeSelectedCH(event) {
    if (event.target.value !== 'disabled') {
      setSizeNotSelected(false);
      sizeCH(event.target.value);
    } else {
      setSizeNotSelected(true);
      sizeCH('disabled');
    }
  }

  if (sizeNotSelected && cartClicked) {
    sizeSelectWarning = <span id="size-select-warning">Please select a size:</span>;
  } else {
    sizeSelectWarning = <span id="size-select-warning" />;
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
      <select onChange={(e) => sizeSelectedCH(e)} name="size" id="size-select">
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
    sizeSelect = (
      <select name="size" id="size-select">
        <option value="disabled" disabled>OUT OF STOCK</option>
      </select>
    );
  }

  if (style.sale_price) {
    price = (
      <span>
        <span id="display-sale-price">{style.sale_price} </span>
        <span id="display-old-price">{style.original_price}</span>
      </span>
    );
  } else {
    price = <span>{style.original_price}</span>;
  }

  return (
    <div id="options-container">
      <Ovrating rating={product.starRating} />
      <a id="overview-reviews-link" href="#clearButton">
        Read All
        {' '}
        {product.totalNumReviews}
        {' '}
        Reviews
      </a>
      <h3>{product.category}</h3>
      <h1>{product.name}</h1>
      <p>
        Price:
        <span>{price}</span>
      </p>
      <button type="button">FB</button>
      <button type="button">TTR</button>
      <button type="button">PIN</button>
      <br />
      <strong>Style</strong>
      {'>'}
      {style.name}
      <div id="stylesContainer">
        {styleList.map((aStyle, index) => {
          let hideCheckMark = true;
          if (aStyle === style) {
            hideCheckMark = false;
          }
          return (
            <div
              key={aStyle.id}
              index={index}
              onClick={() => styleCH(index)}
              onKeyPress={() => styleCH(index)}
              role="presentation"
            >
              <img alt={aStyle.name} height="150" width="75" src={aStyle.photos[0].thumbnail_url} />
              <img hidden={hideCheckMark} alt="selected" height="25" width="25" src="assets/checkmark.png" />
            </div>
          );
        })}
      </div>
      <form>
        {sizeSelectWarning}
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
