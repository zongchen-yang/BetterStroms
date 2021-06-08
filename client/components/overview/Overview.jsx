import React, { useState, useEffect } from 'react';
import Carousel from './product/Carousel';
import Options from './product/Options';
import Description from './product/Description';
import PhotoCarousel from './product/PhotoCarousel';

const Overview = function() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [styleIndex, setStyleIndex] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      console.log('called fetch 1');
      const response = await fetch('/products');
      const productArray = await response.json();

      const results = productArray.map(async (product) => {
        console.log('called fetch products by ID');
        let idQueryReponse = await fetch(`/products/${product.id}`);
        idQueryReponse = await idQueryReponse.json();
        product.features = idQueryReponse.features;

        console.log('called fetch styles');
        let stylesQueryResponse = await fetch(`/products/${product.id}/styles`);
        stylesQueryResponse = await stylesQueryResponse.json();
        product.styles = stylesQueryResponse.results;
        return product;
      });
      const resolvedProducts = await Promise.all(results);
      setProducts(resolvedProducts);
      setError(false);
      setIsLoaded(true);
    }
    fetchProduct();
  }, []);

  function productClickHandler(direction) {
    if (direction === 'right') {
      if (index === products.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    } else {
      if (index === 0) {
        setIndex(products.length - 1);
      } else {
        setIndex(index - 1);
      }
    }
  }

  function styleClickHandler(i) {
    //  styles should be passed into carousel and photo carousel
    //styleIndex;
    setStyleIndex(i);
  }

  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  // eslint-disable-next-line no-else-return
  } else if (!isLoaded) {
    return (
      <div>Loading...</div>
    );
  } else {
    console.log(products);
    return (
      <div>
        <PhotoCarousel style={products[index].styles[styleIndex]}/>
        <Carousel style={products[index].styles[styleIndex]} clickHandler={productClickHandler} />
        <Options product={products[index]} styles={products[index].styles} clickHandler={styleClickHandler}/>
        <Description slogan={products[index].slogan} text={products[index].description} />
        {/* <ul>
          {products.map((prod) => (
            <li key={prod.id}>{prod.name}<br></br>
              {prod.slogan}<br></br>
              {prod.category}<br></br>
              {prod.default_price}<br></br>
              {prod.description}<br></br>
              <ul>
                Features
                {description.features.map((feature, index) => (
                  <li key={index}>
                    {feature.feature}
                    : {feature.value}
                  </li>
                ))}
              </ul>
              <ul>
                Styles
                {styles.results.map((style, index) => (
                  <li key={index}>
                    {style.name}
                    : {style.original_price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul> */}
      </div>
    );
  }
};

export default Overview;
