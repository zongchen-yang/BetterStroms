import React, { useState, useEffect } from 'react';
import RelatedItem from './RelatedItem';

const fetch = require('node-fetch');

const RelatedList = ({ product }) => {
  const [related, setRelated] = useState([]);
  const [items, setItems] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  const getRelated = () => {
    if (product.id) {
      fetch(`http://localhost:3000/products/${product.id}/related`)
        .then((res) => res.json())
        .then((data) => setRelated(data))
        .catch((error) => console.log(error));
    }
  };

  const calculateRating = (obj) => {
    const total = Object.keys(obj.ratings).reduce((accumRating, curr) =>
    accumRating + parseInt(curr) * parseInt(obj.ratings[curr]), 0);
    const amount = Object.values(obj.ratings).reduce((accum, curr) => accum + parseInt(curr), 0);
    return (total / amount) || 0;
  };

  const getItems = async () => {
    if (related) {
      const result = related.map(async (eachId) => {
        let item = await fetch(`/products/${eachId}`);
        item = await item.json();
        let image = await fetch(`/products/${eachId}/styles`);
        image = await image.json();
        item.image = image.results[0].photos[0].url || null;
        let rating = await fetch(`/reviews/meta/?product_id=${eachId}`);
        rating = await rating.json();
        item.rating = calculateRating(rating);
        return item;
      });
      const resolved = await Promise.all(result);
      setItems(resolved);
    }
  };

  useEffect(() => {
    getRelated();
  }, [product.id]);

  useEffect(() => {
    getItems();
  }, [related]);

  const onClickHandler = (item) => {
    setShowCompare(!showCompare);

  }

  return (
    <div>
      <h3 className="title">RELATED PRODUCTS</h3>
      <div className="list">
        { items.map((each) => <RelatedItem item={each} setShowCompare={setShowCompare} />)}
      </div>
      {showCompare ? <Compare product={product} related={items} /> : null}
    </div>
  );
};

export default RelatedList;
