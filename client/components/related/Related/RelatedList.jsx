import React, { useState, useEffect } from 'react';
import RelatedItem from './RelatedItem';

const fetch = require('node-fetch');

const RelatedList = ({ product }) => {
  const [related, setRelated] = useState([]);

  const getRelated = () => {
    if (product.id) {
      fetch(`http://localhost:3000/products/${product.id}/related`)
        .then((res) => res.json())
        .then((data) => setRelated(data))
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    getRelated();
  }, [product.id]);

  return (
    <div>
      <h3 className="title">RELATED PRODUCTS</h3>
      <div className="list">
        { related.map((each) => <RelatedItem product={product} id={each} />)}
      </div>
    </div>
  );
};

export default RelatedList;
