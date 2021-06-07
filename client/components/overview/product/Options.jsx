import React from 'react';

function Options({ product, styles }) {
  return (
    <div>
      <h3>{product.category}</h3>
      <h1>{product.name}</h1>
      <p>Price: {product.default_price} </p>
      <strong>Style</strong> {">"} Selected Style
      <table>
        <tbody>
          <tr>
            {styles.map((style, index) => {
              return (
                <td key={index}>
                  <img height="50" width="50" src={style.photos[0].thumbnail_url} />
                </td>
              )
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Options;
