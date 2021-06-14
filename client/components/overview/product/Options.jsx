import React, { useState } from 'react';
import QuantSelector from './QuantSelector';
import Select from 'react-select';

//         <Options product={product} sku={selectedSku} style={style} chs={clickHandlers} />

function Options({ product, sku, style, chs }) {
  const [sizeNotSelected, setSizeNotSelected] = useState(false);
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
  let selectOptions;

  function optionsCartHandler() {
    // const event = new MouseEvent('mousedown', {
    //   view: window,
    //   bubbles: true,
    // });
    // const sizeElement = document.getElementById('size-select');
    // sizeElement.addEventListener('mousedown', () => console.log('event triggered') );

    // sizeElement.dispatchEvent(event);
    if (sku.size === 'empty') {
      setSizeNotSelected(true);
    //   // document.getElementById('size-select').focus();
    //   // document.getElementById('size-select').click();
    //   // defaultMenuIsOpen={true}
    //   const event = new MouseEvent('mousedown', {
    //     view: window,
    //     bubbles: true,
    //   });
    //   const sizeSelect = document.getElementById('size-select');
    //   sizeSelect.dispatchEvent(event);
    } else {
      const quantSelector = document.getElementById('quantity-select');
      const quantValue = quantSelector.value;
      cartCH(style, quantValue, sku);
    }
  }

  // function sizeSelectedCH(event) {
  //   if (event.target.value !== 'disabled') {
  //     setSizeNotSelected(false);
  //     sizeCH(event.target.value);
  //   } else {
  //     setSizeNotSelected(true);
  //   }
  // }
  function sizeSelectedCH(selectedOption) {
    if (selectedOption.value !== 'disabled') {
      setSizeNotSelected(false);
      sizeCH(selectedOption.value);
    } else {
      setSizeNotSelected(true);
    }
  }
  if (sizeNotSelected) {
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
    selectOptions = [
      {value: 'disabled', label: 'Select Size'}
    ];
    Object.keys(style.skus).map((currentSkuString) => {
      const skuInt = parseInt(currentSkuString, 10);
      const skuObj = style.skus[skuInt];
      if (skuObj === undefined) {
        return null;
      }
      const result = {value: skuInt, label: skuObj.size};
      selectOptions.push(result);
    });
    // sizeSelect = (
    //   <select onChange={(e) => sizeSelectedCH(e)} name="size" id="size-select">
    //     <option value="disabled">Select Size</option>
    //     {/* Object.keys returns an array = ['sku1', sku2', ...] */}
    //     {Object.keys(style.skus).map((currentSkuString) => {
    //       const skuInt = parseInt(currentSkuString, 10);
    //       const skuObj = style.skus[skuInt];
    //       if (skuObj === undefined) {
    //         return null;
    //       }
    //       return (
    //         <option key={skuInt} value={skuInt}>{skuObj.size}</option>
    //       );
    //     })}
    //   </select>
    // );
  } else {
    cartButton = <button hidden type="button" onClick={cartCH}>Add to Cart</button>;
    selectOptions = [
      {value: 'disabled', label: 'OUT OF STOCK'}
    ];
    // sizeSelect = (
    //   <select name="size" id="size-select">
    //     <option value="disabled" disabled>OUT OF STOCK</option>
    //   </select>
    // );
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
      <span>Stars {product.starRating}</span>
      <a href="#clearButton">
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
        {sizeSelectWarning}
        <label htmlFor="size-select">
          Size:
          {/* {sizeSelect} */}
          {sizeNotSelected ? <Select menuIsOpen={true} options={selectOptions} onChange={sizeSelectedCH} /> : <Select options={selectOptions} onChange={sizeSelectedCH} /> }
        </label>
        <QuantSelector sku={sku} />
        {cartButton}
        {favoriteButton}
      </form>
    </div>
  );
}

export default Options;
