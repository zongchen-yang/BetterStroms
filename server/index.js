const express = require('express');
const path = require('path');
const colors = require('colors');
const axios = require('axios');
// adding morgan

const GITHUB_TOKEN = require('../config.js');

const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea';

let app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../public')));

app.listen(3000);

app.route(':path').all(( async (req, res) => {
  console.log('GET request on /'.yellow);
  console.log(req.route)
  const options = {
    method: req.route.stack[0].method,
    url: `${API_URL}${req.params.path}`,
    params: req.route.stack[0].params,
    headers: GITHUB_TOKEN,
   };

   const results = await axios(options).catch((err) => {
     res.status(500);
     res.send(err.response.data);
   });
   if (results) {
     res.status(200);
     res.send(results.data);
   }
}));

// /////////////////////////////////////////////////////////////////////////////
// ///////////////////////      PRODUCT                  ///////////////////////
// ///////////////////////                   ROUTES      ///////////////////////
// /////////////////////////////////////////////////////////////////////////////

// app.get('/products/', (async (req, res) => {
//   console.log('GET request on /products'.yellow);
//   console.log(req.route)
//   const options = {
//     method: 'GET',
//     url: `${API_URL}/products/`,
//     headers: GITHUB_TOKEN,
//   };
//   const results = await axios(options).catch((err) => {
//     res.status(500);
//     res.send(err.response.data);
//   });
//   if (results) {
//     res.status(200);
//     res.send(results.data);
//   }
// }));

// app.get('/products/:productId', (async (req, res) => {
//   console.log('GET request on /products/:productId'.yellow);
//   const { productId } = req.params;
//   const options = {
//     method: 'GET',
//     url: `${API_URL}/products/${productId}`,
//     headers: GITHUB_TOKEN,
//   };
//   const results = await axios(options).catch((err) => {
//     res.status(500);
//     res.send(err.response.data);
//   });
//   if (results) {
//       res.send(results.data);
//   }
// }));


// app.get('/products/:productId/styles', (async (req, res) => {
//   console.log('GET request on /products/:productId/styles'.yellow);
//   const { productId } = req.params;
//   const options = {
//     method: 'GET',
//     url: `${API_URL}/products/${productId}/styles`,
//     headers: GITHUB_TOKEN,
//   };
//   const results = await axios(options).catch((err) => {
//     res.status(500);
//     res.send(err.response.data);
//   });
//   if (results) {
//     res.send(results.data);
//   }
// }));

// app.get('/products/:productId/related', (async (req, res) => {
//   console.log('GET request on /products/:productId/related'.yellow);
//   const { productId } = req.params;
//   const options = {
//     method: 'GET',
//     url: `${API_URL}/products/${productId}/related`,
//     headers: GITHUB_TOKEN,
//   };
//   const results = await axios(options).catch((err) => {
//     res.status(500);
//     res.send(err.response.data);
//   });
//   if (results) {
//     res.send(results.data);
//   }
// }));

// // /////////////////////////////////////////////////////////////////////////////
// // ///////////////////////      REVIEWS                  ///////////////////////
// // ///////////////////////                   ROUTES      ///////////////////////
// // /////////////////////////////////////////////////////////////////////////////

// app.get('/reviews/', ( async (req, res) => {
//   console.log('GET request on /reviews/'.yellow);
//   const options = {
//     method: 'GET',
//     url: `${API_URL}/reviews/`,
//     headers: GITHUB_TOKEN,
//     params: req.params
//   };
//   const results = await axios(options).catch((err) => console.log(err.response.data));
//   res.send(results);
// }));


// //GET /reviews/meta

// app.get('/reviews/meta/:product_id', ( async (req, res) => {
//   console.log('GET request on /reviews/meta'.yellow);
//   const options = {
//     method: 'GET',
//     url: `${API_URL}/reviews/meta`,
//     headers: GITHUB_TOKEN,
//     params: req.params //req.parameters.product_id}
//   };
//   const results = await axios(options).catch((err) => console.log(err.response.data));
//   res.send(results.data);
// }));

// //Add a Review
// app.post('/reviews', ( async (req, res) => {
//   console.log('POST request on /reviews'.yellow);
//   const options = {
//     method: 'POST',
//     url: `${API_URL}/reviews/meta`,
//     headers: GITHUB_TOKEN,
//     params: req.params //req.parameters.product_id}
//   };
//   const results = await axios(options).catch((err) => console.log(err.response.data));
//   res.send(results.data);
// }));

// //ReportReview
// app.put('/reviews/:review_id/report', ( async (req, res) => {
//   console.log('PUT request on /reviews/:review_id'.yellow);
//   const options = {
//     method: 'PUT',
//     url: `${API_URL}/reviews/:review_id/report`,
//     headers: GITHUB_TOKEN,
//     params: req.params
//   };
//   const results = await axios(options).catch((err) => console.log(err.response.data));
//   res.send(results);
// }));


// // PUT /reviews/:review_id/helpful
// app.put('/reviews/:review_id/helpful', ( async (req, res) => {
//   console.log('PUT request on /reviews/:review_id'.yellow);
//   const options = {
//     method: 'PUT',
//     url: `${API_URL}/reviews/:review_id/helpful`,
//     headers: GITHUB_TOKEN,
//     params: {product_id: req.params.review_id}
//     //Paramaters:
//   };
//   const results = await axios(options).catch((err) => console.log(err.response.data));
//   res.send(results);
// }));


// //where has this updated to? -ethan

// // /////////////////////////////////////////////////////////////////////////////
// // ///////////////////////      Q AND A                  ///////////////////////
// // ///////////////////////                   ROUTES      ///////////////////////
// // /////////////////////////////////////////////////////////////////////////////

// // app.get('/qa/questions', ((req, res) => {
// //   console.log('GET request on /qa/questions'.yellow);
// //   const options = {
// //     method: 'GET',
// //     url: `${API_URL}/qa/questions`,
// //     headers: GITHUB_TOKEN,
// //   };
// //   const results = await axios(options).catch((err) => {
// //     res.status(500);
// //     res.send(err.response.data);
// //   });
// //   if (results) {
// //     res.send(results.data);
// //   }
// // }));

// // app.get('/qa/questions/:question_id/answers'. ((req, res) => {
// //   const { question_id } = req.params.question_id;
// //   console.log(`GET request on /qa/questions/${question_id}`.yellow);
// // }))

// // /////////////////////////////////////////////////////////////////////////////
// // ///////////////////////      CART                     ///////////////////////
// // ///////////////////////                    ROUTES     ///////////////////////
// // /////////////////////////////////////////////////////////////////////////////

// app.get('/cart', ((req, res) => {

// }));

// // /////////////////////////////////////////////////////////////////////////////
// // ///////////////////////  INTERACTIONS                 ///////////////////////
// // ///////////////////////                   ROUTES      ///////////////////////
// // /////////////////////////////////////////////////////////////////////////////

// app.post('/interactions', ((req, res) => {

// }));
