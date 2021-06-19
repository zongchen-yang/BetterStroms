import React, { useState, useEffect, useRef } from 'react';

const Compare = ({
  product, related, setShowCompare, theme,
}) => {
  const [features, setFeature] = useState({});
  const node = useRef();

  useEffect(() => {
    const obj = {};
    for (let i = 0; i < product.features.length; i++) {
      obj[product.features[i].feature] = {};
      obj[product.features[i].feature].product = product.features[i].value || true;
    }
    if (related) {
      for (let i = 0; i < related.features.length; i++) {
        const { feature } = related.features[i];
        const value = related.features[i].value || true;
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
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <div className="compare" id={theme ? null : 'compareDark'} ref={node}>
      <h4 className="comparing">COMPARING</h4>
      <div className="compareName">
        <span className="compareNameLeft">{product.name}</span>
        <span className="compareNameRight">{related.name}</span>
      </div>
      {Object.keys(features).map((key, i) => (
        <div key={i} className="compareFeature">
          <div className="checks">
            {features[key].product ? <i className="fas fa-check" /> : <span> </span>}
          </div>
          <div className="feature">
            {features[key].product === true ? <span> </span> : <span>{features[key].product}</span>}
          </div>
          <div className="feature middle">{key}</div>
          <div className="feature">
            {features[key].related === true ? <span> </span> : <span>{features[key].related}</span>}
          </div>
          <div className="checks">
            {features[key].related ? <i className="fas fa-check" /> : <span> </span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Compare;
