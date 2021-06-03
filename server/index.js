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

app.get('/', ( (req, res) => {
  console.log('GET request on /'.yellow)
  })
)

app.get('/products/:productId', (async (req, res) => {
  // console.log(req.params.productId);
  console.log('GET request on /products'.yellow);
  const productId = req.params.productId;
  const options = {
    method: 'GET',
    url: `${API_URL}/products/${productId}`,
    headers: {
      Authorization: GITHUB_TOKEN,
    },

  };
  const results = await axios(options).catch((err) => {
    res.sendStatus(500);
    console.log(err.response.data);
  });
  if (results) {
    res.send(results.data);
  }
})

);
//        reviews
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

//      /qa/questions
app.get('/q&a', ( (req, res) => {

})
)
//   /cart
app.get('/cart', ( (req, res) => {

})
)
// post interactios