import React from 'react';

function Description({ product }) {
  return (
    <div id="descriptionContainer">
      <div id="description-text">
        <div className="description-space-vertical">
          <span id="slogan-text">{product.slogan}</span>
        </div>
        <div className="description-space-vertical">
          <span className="small-text">{product.description}</span>
        </div>
      </div>
      <div id="description-right">
        <div className="veritcalLine" />
        <div id="feature-text-container">
          {product.features.map((item, index) => (
            <div key={index} className="description-feature-text">
              <span className="feature-text">{item.feature}</span>
              <span className="feature-text">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Description;
