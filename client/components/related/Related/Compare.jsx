import React, { useState, useEffect } from 'react';

const Compare = ({ product, related }) => {
  const [features, setFeature] = useState([]);

  useEffect(() => {
    //for (var i = 0 ) don't add if existing
    setFeature([...product.features]);
  }, [product, related]);

  console.log(product);
  console.log(related);
  console.log(features);

  return (
    <div className="compare">
      <div className="name1">{product.name}</div>
      <div className="name2">{related.name}</div>
      <div className="feature">
        {features.map((each) => (product.features.feature === each.feature ? <div className="value">{product.features.value}</div> : null))}
      </div>
      <div className="feature">
        {features.map((each) => <div className="vertical">{each.feature}</div>)}
      </div>
      <div className="feature">
        {features.map((each) => (related.features.indexOf(each) > -1 ? <div className="value">{related.features.value}</div> : null))}
      </div>
    </div>
  );
};

export default Compare;
