const express = require('express');
const path = require('path');
const colors = require('colors');

const githubToken = require('../config.js');


let app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../public')));

app.listen(3000);

app.get('/', function(req, res) {
  console.log(`GET request on /`.yellow)
});