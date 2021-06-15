import React, { useState, useEffect, useCallback } from 'react';
import InventoryItem from './InventoryItem';

const InventoryList = ({ favorites, displayItemCH, deleteFavoriteCH }) => {
  const [window, setWindow] = useState([]);
  const [pageReady, setPageReady] = useState(false);

  const getWindow = (items) => {
    if (items.length > 3) {
      setWindow(items.slice(0, 3));
    } else {
      setWindow(items);
    }
  };

  useEffect(async () => {
    if (favorites) {
      getWindow(favorites);
      setPageReady(true);
    }
  }, [favorites]);

  const rightCH = () => {
    const rightIndex = favorites.indexOf(window[2]);
    setWindow(favorites.slice(rightIndex + 1, rightIndex + 4));
  };

  const leftCH = () => {
    const leftIndex = favorites.indexOf(window[0]);
    setWindow(favorites.slice(leftIndex - 3, leftIndex));
  };

  if (!pageReady) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <h3 className="title">YOUR OUTFIT</h3>
      <div className="list">
        {window && window[0] && window[0].index !== 0 ? <button type="button" onClick={leftCH}>left</button> : null}
        {window.map((each, i) => <InventoryItem key={i} item={each} deleteCH={deleteFavoriteCH} />)}
        {window && window[2] && window[2].index !== favorites.length - 1 ? <button type="button" onClick={rightCH}>right</button> : null}
      </div>
    </div>
  );
};

export default InventoryList;
