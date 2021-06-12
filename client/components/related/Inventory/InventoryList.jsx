import React, { useState, useEffect } from 'react';
import InventoryItem from './InventoryItem';

const InventoryList = ({ product: { id } }) => {
  const [inventory, setInventory] = useState([]);

  const getInventory = () => {
    if (id) {
      fetch(`http://localhost:3000/products/${id + 1}/related`)
        .then((res) => res.json())
        .then((data) => setInventory(data))
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    getInventory();
  }, [id]);

  return (
    <div>
      <h3 className="title">YOUR OUTFIT</h3>
      <div className="list">
        { inventory.map((each) => <InventoryItem id={each} />)}
      </div>
    </div>
  );
};

export default InventoryList;
