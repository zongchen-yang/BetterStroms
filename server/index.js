const express = require('express');
const path = require('path');
const colors = require('colors');
const axios = require('axios');

const { GITHUB_TOKEN } = require('../config.js');

const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea';

let app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../public')));

app.listen(3000);

app.get('/', ((req, res) => {
  console.log('GET request on /'.yellow);
}));

// /////////////////////////////////////////////////////////////////////////////
// ///////////////////////      PRODUCT                  ///////////////////////
// ///////////////////////               ROUTES          ///////////////////////
// /////////////////////////////////////////////////////////////////////////////

app.get('/products/', (async (req, res) => {
  console.log('GET request on /products'.yellow);
  const options = {
    method: 'GET',
    url: `${API_URL}/products/`,
    headers: {
      Authorization: GITHUB_TOKEN,
    },

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

app.get('/products/:productId', (async (req, res) => {
  console.log('GET request on /products/:productId'.yellow);
  const { productId } = req.params;
  const options = {
    method: 'GET',
    url: `${API_URL}/products/${productId}`,
    headers: {
      Authorization: GITHUB_TOKEN,
    },

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
// ///////////////////////      REVIEWS                  ///////////////////////
// ///////////////////////               ROUTES          ///////////////////////
// /////////////////////////////////////////////////////////////////////////////

app.get('/reviews/', ( async (req, res) => {
  console.log('GET request on /reviews/'.yellow);
  const options = {
    method: 'GET',
    url: `${API_URL}/reviews/`,
    headers: {
      Authorization: GITHUB_TOKEN,
    },
  };
  const results = await axios(options).catch((err) => console.log(err.response.data));
  res.send(results);
}));

// /////////////////////////////////////////////////////////////////////////////
// ///////////////////////      Q AND A                  ///////////////////////
// ///////////////////////               ROUTES          ///////////////////////
// /////////////////////////////////////////////////////////////////////////////

app.get('/qa', ((req, res) => {

}));

// /////////////////////////////////////////////////////////////////////////////
// ///////////////////////      CART                     ///////////////////////
// ///////////////////////               ROUTES          ///////////////////////
// /////////////////////////////////////////////////////////////////////////////

app.get('/cart', ((req, res) => {

}));

// /////////////////////////////////////////////////////////////////////////////
// ///////////////////////  INTERACTIONS                 ///////////////////////
// ///////////////////////               ROUTES          ///////////////////////
// /////////////////////////////////////////////////////////////////////////////

app.post('/interactions', ((req, res) => {

}));
