const express = require('express'),
  app = express(),
  db = require('./db'),
  UrlController = require('./UrlController');

app.use('/', UrlController);

module.exports = app;
