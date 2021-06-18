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
    setPageReady(false);
    if (favorites) {
      getWindow(favorites);
      setPageReady(true);
    }
  }, [favorites]);

  const rightCH = () => {
    const rightIndex = favorites.indexOf(window[2]);
    setWindow(favorites.slice(rightIndex - 1, rightIndex + 2));
  };

  const leftCH = () => {
    const leftIndex = favorites.indexOf(window[0]);
    setWindow(favorites.slice(leftIndex - 1, leftIndex + 2));
  };

  if (!pageReady) {
    return <p>loading...</p>;
  }

  const windowLast = window[window.length - 1] || undefined;
  const favoritesLast = favorites[favorites.length - 1] || undefined;
  const fourth = favorites.indexOf(window[2]) > -1 ? (favorites.indexOf(window[2]) + 1) : undefined;

  return (
    <div className="inventoryList">
      <h3 className="title">YOUR OUTFIT</h3>
      <div className="list">
        {window.length ? null : <span>This is empty. Go pick something!</span>}
        {window && window[0] && favorites && favorites[0] && (window[0].id !== favorites[0].id
        || window[0].style.id !== favorites[0].style.id)
          ? <i className="fas fa-chevron-left fa-2x" type="button" onClick={leftCH} /> : null}
        {window.map((each, i) => (
          <InventoryItem
            key={i}
            item={each}
            displayItemCH={displayItemCH}
            deleteCH={deleteFavoriteCH}
          />
        ))}
        {favorites[fourth]
          ? (
            <InventoryItem
              item={favorites[fourth]}
              displayItemCH={displayItemCH}
              deleteCH={deleteFavoriteCH}
              className={{ className: 'fourth' }}
            />
          ) : null}
        {window && windowLast && favorites && favorites[0] && (windowLast.id !== favoritesLast.id
        || windowLast.style.id !== favoritesLast.style.id)
          ? <i className="fas fa-chevron-right fa-2x" type="button" onClick={rightCH} /> : null}
      </div>
    </div>
  );
};

export default InventoryList;
