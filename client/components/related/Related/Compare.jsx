import React, { useState, useEffect, useRef } from 'react';

const Compare = ({ product, related, setShowCompare }) => {
  const [features, setFeature] = useState({});
  const node = useRef();

  useEffect(() => {
    const obj = {};
    for (let i = 0; i < product.features.length; i++) {
      obj[product.features[i].feature] = {};
      obj[product.features[i].feature].product = product.features[i].value;
    }
    if (related) {
      for (let i = 0; i < related.features.length; i++) {
        let feature = related.features[i].feature;
        let value = related.features[i].value;
        if (!obj[feature]) {
          obj[feature] = {};
        }
        obj[feature].related = value;
      }
    }
    setFeature(obj);
  }, [related]);

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setShowCompare(false);
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  console.log('got here');
  return (
    <div className="compare" id="compare" ref={node}>
      <h5>COMPARING</h5>
      <div className="compareName">
        <div className="compareName">{product.name}</div>
        <div className="compareName">{related.name}</div>
      </div>
      {Object.keys(features).map((key) => (
        <div className="compareFeature">
          {features[key].product === true ? <i className="fas fa-check" /> : <div className="feature">{features[key].product}</div>}
          <div className="feature">{key}</div>
          {features[key].related === true ? <i className="fas fa-check" /> : <div className="feature">{features[key].related}</div>}
        </div>
      ))}
    </div>
  );
};

export default Compare;
