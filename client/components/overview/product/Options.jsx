import React from 'react';
import QuantSelector from './QuantSelector';

//         <Options product={product} sku={selectedSku} style={style} chs={clickHandlers} />

function Options({ product, sku, style, chs }) {
  let favoriteButton;
  const {
    styleCH, sizeCH, cartCH, favoriteCH
  } = chs;
  const { styleList } = product;
  if (style.isFavorite) {
    favoriteButton = <button type="button" onClick={() => favoriteCH(style)}>Heart</button>;
  } else {
    favoriteButton = <button type="button" onClick={() => favoriteCH(style)}>Star</button>;
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
          <select onChange={(e) => sizeCH(e)} name="size" id="size-select">
            <option value="">Select Size</option>
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
        </label>
        <QuantSelector sku={sku} />
        <button type="button" onClick={cartCH}>Add to Cart</button>
        {favoriteButton}
      </form>
    </div>
  );
}

export default Options;
