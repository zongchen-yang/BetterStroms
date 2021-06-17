import React from 'react';

function Description({ product }) {
  return (
    <div id="descriptionContainer">
      <div id="descripion-text">
        <span>{product.slogan}</span>
        <span>{product.description}</span>
      </div>
      <div id="descripton-right">
        <div className="veritcalLine" />
        <div id="feature-text-container">
          {product.features.map((item, index) => (
            <div key={index} className="description-feature-text">
              <span>{item.feature}</span>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Description;
