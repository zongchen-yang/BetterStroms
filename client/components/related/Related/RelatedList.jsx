import React, { useState, useEffect, useCallback } from 'react';
import RelatedItem from './RelatedItem';
import Compare from './Compare';

const RelatedList = ({ product, displayItemCH }) => {
  const [related, setRelated] = useState([]);
  const [items, setItems] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [window, setWindow] = useState([]);
  const [pageReady, setPageReady] = useState(false);

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

  const getWindow = (resolved) => {
    if (resolved.length > 3) {
      setWindow(resolved.slice(0, 3));
    } else {
      setWindow(resolved);
    }
  };

  const getItems = async () => {
    if (related) {
      const result = related.map(async (eachId, index) => {
        let item = await fetch(`/products/${eachId}`);
        item = await item.json();
        let image = await fetch(`/products/${eachId}/styles`);
        image = await image.json();
        item.image = image.results[0].photos[0].url || null;
        let rating = await fetch(`/reviews/meta/?product_id=${eachId}`);
        rating = await rating.json();
        rating = calculateRating(rating);
        item.rating = {
          whole: Math.floor(rating),
          part: `${Math.round(((rating - Math.floor(rating)) * 4)) * 25}%`,
        };
        item.index = index;
        return item;
      });
      const resolved = await Promise.all(result);
      setItems(resolved);
      getWindow(resolved);
    }
  };

  useEffect(() => {
    getRelated();
  }, [product.id]);

  useEffect(async () => {
    await getItems();
    setPageReady(true);
  }, [related]);

  const showCompareCH = (item) => {
    setSelectedItem(item);
    setShowCompare(true);
  };

  const rightCH = () => {
    const rightIndex = items.indexOf(window[2]);
    setWindow(items.slice(rightIndex + 1, rightIndex + 4));
  };

  const leftCH = () => {
    const leftIndex = items.indexOf(window[0]);
    setWindow(items.slice(leftIndex - 3, leftIndex));
  };

  if (!pageReady) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <h3 className="title">RELATED PRODUCTS</h3>
      <div className="list">
        {window && window[0] && window[0].index !== 0 ? <button type="button" onClick={leftCH}>left</button> : null}
        {window.map((each, i) => (
          <RelatedItem
            key={i}
            item={each}
            showCompareCH={showCompareCH}
            displayItemCH={displayItemCH}
          />
          ))}
        {window && window[2] && window[2].index !== items.length - 1 ? <button type="button" onClick={rightCH}>right</button> : null}
      </div>
      {selectedItem && showCompare
        ? <Compare product={product} related={selectedItem} setShowCompare={setShowCompare} />
        : null}
    </div>
  );
};

export default RelatedList;
