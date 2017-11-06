const mongoose = require('mongoose'),
  UrlSchema = new mongoose.Schema({
    url: String,
    html: String
  })

mongoose.model('Url', UrlSchema);

module.exports = mongoose.model('Url');
