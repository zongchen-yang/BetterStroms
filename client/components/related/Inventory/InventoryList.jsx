import React, { useState, useEffect, useCallback } from 'react';
import InventoryItem from './InventoryItem';

const InventoryList = ({ favorites, displayItemCH, deleteFavoriteCH }) => {
  const [window, setWindow] = useState();
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

  const windowLast = window[window.length - 1] || undefined;
  const favoritesLast = favorites[favorites.length - 1] || undefined;
  const fourth = favorites.indexOf(window[2]) + 1;

  return (
    <div>
      <h3 className="title">YOUR OUTFIT</h3>
      <div className="list">
        {window && window[0] && (window[0].id !== favorites[0].id
        || window[0].style.id !== favorites[0].style.id)
          ? <button type="button" onClick={leftCH}>left</button> : null}
        {window.map((each, i) => (
          <InventoryItem
            key={i}
            item={each}
            displayItemCH={displayItemCH}
            deleteCH={deleteFavoriteCH}
          />
        ))}
        {favorites.length > 3
          ? (
            <InventoryItem
              item={favorites[fourth]}
              displayItemCH={displayItemCH}
              deleteCH={deleteFavoriteCH}
            />
          ) : null}
        {window && windowLast && (windowLast.id !== favoritesLast.id
        || windowLast.style.id !== favoritesLast.style.id)
          ? <button type="button" onClick={rightCH}>right</button> : null}
      </div>
    </div>
  );
};

export default InventoryList;
