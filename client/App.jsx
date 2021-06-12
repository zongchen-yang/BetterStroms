import React, { useState, useEffect } from 'react';
//import Overview from './components/overview/Overview';
import ReviewList from './components/ratingsreviews/reviews/ReviewList';

function App() {
  const [selectedProduct, setSelectedProduct] = useState([]);
  // const [selecetedStyle, setSelectedStyle] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [stateProductList, setStateProductList] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewMeta, setReviewMeta] = useState([]);
  //const [overallRating, setRating] = useState(0);
  const [totalNumberOfRatings, setTotalRatings] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  //const id = 20104;

  //overallRating = selectedProduct.starRating;
  let productList = [];

  async function getProduct(id, index) {
    const product = productList[index];
    let results = await fetch(`/products/${id}`);
    results = await results.json();
    product.features = results.features;
  }

  async function getStyles(id, index) {
    let response = await fetch(`/products/${id}/styles`);
    response = await response.json();
    const product = productList[index];
    response.results.forEach((style) => {
      const thisStyle = {
        id: style.style_id,
        name: style.name,
        default_price: product.default_price,
        original_price: style.original_price,
        sale_price: style.sale_price,
        photos: style.photos,
        skus: style.skus,
      };
      product.styleThumbnail.push(style.photos[0].thumbnail_url);
      product.styleList.push(thisStyle);
    });
  }

  async function getProductList() {
    let response = await fetch('/products');
    response = await response.json();
    let i = 0;
    response.forEach((product) => {
      const thisProduct = {
        index: i,
        id: product.id,
        category: product.category,
        default_price: product.default_price,
        description: product.description,
        name: product.name,
        slogan: product.slogan,
        starRating: null,
        totalNumReviews: null,
        features: [],
        styleThumbnail: [],
        styleList: [],
        reviews: [],
      };
      productList.push(thisProduct);
      i += 1;
    });
  }

  const calculateRating = () => {
    if (reviewMeta.ratings) {
      let total = 0;
      let numberOfRatings = 0;
      for (var i = 1; i < 6; i++) {
        numberOfRatings += parseFloat(reviewMeta.ratings[i], 10);
        total += (i * parseFloat(reviewMeta.ratings[i], 10));
      }
      setRating((total / numberOfRatings).toFixed(1));
      setTotalRatings(total);
    }
  };

  // async function fetchReviews(id) {
  //   if (id) {
  //     const response = await fetch(`/reviews?product_id=${id}&sort=relevant&count=1000`);
  //     const json = await response.json();
  //     for (let j = 0; j < json.results.length; j++) {
  //       const oldDate = json.results[j].date.slice(0, 10);
  //       const newDate = new Date(oldDate);
  //       json.results[j].newDate = newDate;
  //     }
  //     await setReviews(json.results);
  //   }
  // }

  async function getReviews(id, index) {
    const product = productList[index];
    let response = await fetch(`/reviews?product_id=${id}`);
    response = await response.json();
    product.totalNumReviews = response.results.length;
    response.results.forEach((review) => {
      const thisReview = {
        id: review.review_id,
        body: review.body,
        photos: review.photos,
        summary: review.summary,
        rating: review.rating,
        recommend: review.recommend,
        response: review.reponse,
        reviewer_name: review.reviewer_name,
      };
      productList[index].reviews.push(thisReview);
    });
  }

  async function fetchReviewMeta(id) {
    if (id) {
      const response = await fetch(`/reviews/meta?product_id=${id}`);
      const json = await response.json();
      await setReviewMeta(json);
    }
  }

  useEffect(() => {
    async function initialize() {
      console.log('initializing')
      await getProductList();
      getReviews(product.id, 4);
      const product = productList[4];
      getProduct(product.id, 4);
      getStyles(product.id, 4);
      fetchReviews(product.id);
      fetchReviewMeta(product.id);
      //await getReviews(product.id, 4);
      // for (let i = 0; i < productList.length; i++) {
      //   let product = productList[i];
      //   await getProduct(product.id, i)
      // }
      // for (let i = 0; i < productList.length; i++) {
      //   let product = productList[i];
      //   await getStyles(product.id, i)
      // }
      // for (let i = 0; i < productList.length; i++) {
      //   let product = productList[i];
      //   await getReviews(product.id, i)
      // }
      //calculateRating();
      setStateProductList(productList);
      setSelectedProduct(productList[4]);
      // setSelectedStyle(productList[0].styleList[0]);
      //setReviews(productList[4].reviews);
      setIsLoaded(true);
    }
    initialize();
  }, []);

  useEffect(() => { calculateRating(); }, [reviewMeta.ratings]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  console.log(stateProductList);
  return (
    <div>
      <div>Hello from App</div>
      <div>
        {/* <Overview product={selectedProduct} /> */}
        <ReviewList
        product={selectedProduct.id}
        reviews={reviews}
        overallRating={overallRating}
        reviewMeta={reviewMeta}
        totalNumberOfRatings={totalNumberOfRatings}
      />
      </div>
    </div>
  );
};

export default App;


// import React, { useState, useEffect } from 'react';
// //import QAndA from './components/qanda/QAndA';

// function App() {
//   const [selectedProduct, setSelectedProduct] = useState('');
//   const [selecetedStyle, setSelectedStyle] = useState(0);
//   const [favorites, setFavorites] = useState([]);
//   const [stateProductList, setStateProductList] = useState([]);
//   const [reviews, setReviews] = useState([]);

//   let productList = [];

//   async function getProduct(id, index) {
//     const product = productList[index];
//     let results = await fetch(`/products/${id}`);
//     results = await results.json();
//     product.features = results.features;
//   }

//   async function getStyles(id, index) {
//     let response = await fetch(`/products/${id}/styles`);
//     response = await response.json();
//     const product = productList[index];
//     response.results.forEach((style) => {
//       const thisStyle = {
//         id: style.style_id,
//         name: style.name,
//         default_price: product.default_price,
//         original_price: style.original_price,
//         sale_price: style.sale_price,
//         photos: style.photos,
//         skus: style.skus,
//       };
//       product.styleThumbnail.push(style.photos[0].thumbnail_url);
//       product.styleList.push(thisStyle);
//     });
//   }

//   async function getProductList() {
//     let response = await fetch('/products');
//     response = await response.json();
//     response.forEach((product) => {
//       const thisProduct = {
//         id: product.id,
//         category: product.category,
//         default_price: product.default_price,
//         description: product.description,
//         name: product.name,
//         slogan: product.slogan,
//         starRating: null,
//         totalNumReviews: null,
//         features: [],
//         styleThumbnail: [],
//         styleList: [],
//         reviews: [],
//       };
//       productList.push(thisProduct);
//     });
//   }

//   function calculateRating(product) {
//     if (product.reviews.length) {
//       let total = 0;
//       for (let i = 0; i < product.reviews.length; i++) {
//         total += product.reviews[i].rating;
//       }
//       total /= product.reviews.length;
//       product.starRating = total;
//     }
//   };

//   async function getReviews(id, index) {
//     const product = productList[index];
//     let response = await fetch(`/reviews?product_id=${id}`);
//     response = await response.json();
//     product.totalNumReviews = response.results.length;
//     response.results.forEach((review) => {
//       const thisReview = {
//         id: review.review_id,
//         body: review.body,
//         photos: review.photos,
//         summary: review.summary,
//         rating: review.rating,
//         recommend: review.recommend,
//         response: review.reponse,
//         reviewer_name: review.reviewer_name,
//       };
//       productList[index].reviews.push(thisReview);
//     });
//   }

//   useEffect(() => {
//     async function initialize() {
//       await getProductList();
//       for (let i = 0; i < productList.length; i++) {
//         let product = productList[i];
//         await getProduct(product.id, i)
//       }
//       for (let i = 0; i < productList.length; i++) {
//         let product = productList[i];
//         await getStyles(product.id, i)
//       }
//       for (let i = 0; i < productList.length; i++) {
//         let product = productList[i];
//         await getReviews(product.id, i)
//       }
//       productList.forEach((product) => calculateRating(product));
//       setStateProductList(productList);
//       setSelectedProduct(productList[0]);
//       setSelectedStyle(productList[0].styleList[0]);
//       setReviews(productList[0].reviews);
//     }
//     initialize();
//   }, []);
//   console.log(stateProductList);
//   console.log(selectedProduct);
//   console.log(selecetedStyle);
//   console.log(reviews);
//   return (
//     <div>
//       <div>Hello from App</div>
//       <div>
//         {/* {console.log('this is when done rendering', stylesList)} */}
//         {/* <QAndA product={product} /> */}
//       </div>
//     </div>
//   );
// };

// export default App;
