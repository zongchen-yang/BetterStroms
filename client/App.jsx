import React, { useState, useEffect } from 'react';
import Overview from './components/overview/Overview';

function App() {
  function favoriteCH(style) {
    if (style.isFavorite) {
      // remove from favorites
      style.isFavorite = false;
      const temp = [...favorites];
      let removedIndex = 0;
      temp.forEach((item, itemIndex) => {
        if (item.id === style.id) {
          removedIndex = itemIndex;
        }
      });
      temp.splice(removedIndex, 1);
      setFavorites(temp);
    } else {
      const temp = [...favorites];
      style.isFavorite = true;
      temp.push(style);
      setFavorites(temp);
      // add to favorites
    }
  }

  function cartCH() {

  }

  return (
    <Overview product={selectedProduct} favoriteCH={favoriteCH} cartCH={cartCH} />
  );
}

export default App;
