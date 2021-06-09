import React, { useState, useEffect } from 'react';

const Compare = ({ product, related }) => {
  const [features, setFeature] = useState({});

  useEffect(() => {
    const obj = {};
    for (let i = 0; i < product.features.length; i++) {
      obj[product.features[i].feature] = {};
      obj[product.features[i].feature].product = product.features[i].value;
    }
    for (let i = 0; i < related.features.length; i++) {
      let feature = related.features[i].feature;
      let value = related.features[i].value;
      obj[feature].related = value;
    }
    setFeature(obj);
  }, [product, related]);

  console.log(features);
  return (
    <div className="compare">
      <h5>COMPARING</h5>
      <div className="compareName">
        <div className="compareName">{product.name}</div>
        <div className="compareName">{related.name}</div>
      </div>
      {Object.keys(features).map((key) => (
        <div className="compareFeature">
          <div className="feature">{features[key].product}</div>
          <div className="feature">{key}</div>
          <div className="feature">{features[key].related}</div>
        </div>
      ))}
    </div>
  );
};

export default Compare;
