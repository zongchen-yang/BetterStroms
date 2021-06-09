import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QAndA from './components/qanda/QAndA';
import sampleData from '../sampleData';

const App = () => {
  const [product, setProduct] = useState('');
  // const [selecetedStyle, setSelectedStyle] = useState(0);
  // const [favorites, setFavorites] = useState([]);
  // const [productList, setProductList] = useState([]);
  // const [reviews, setReviews] = useState([]);
  // const [productObject, setProductObject] = useState({});

  // const getProductList = async () => {
  //   const productResults = await axios.get('/products');
  //   console.log(productResults.data);
  //   setProductList(productResults.data);
  //   console.log(productList);
  // };

  useEffect(() => {
    fetch('http://localhost:3000/products/20104')
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .then(console.log('logging state product id:', product))
      .catch((error) => console.log(error));
    console.log('hello from use effect');
    // getProductList();
  }, []);

  return (
    <div>
      <div>Hello from App</div>
      <div>
        {console.log('this is when done rendering', productList)}
        <QAndA product={product} />
      </div>
    </div>
  );
};

export default App;
