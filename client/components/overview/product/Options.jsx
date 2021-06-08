import React from 'react';

function Options({ product, styles, clickHandler }) {
  // if (styles.photo === undefined) {
  //   return null;
  // }
  return (
    <div>
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
    </div>
  );
}

export default Options;
