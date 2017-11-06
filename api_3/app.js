const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const request = require('request');
const rp = require('request-promise');
const app = express();

// API Endpoints & Data
const productListUrl = 'https://raw.githubusercontent.com/jttyeung/sample-apis/master/api_3/data/getListOfProducts.json'
const productsRatingsUrl = 'https://raw.githubusercontent.com/jttyeung/sample-apis/master/api_3/data/getRatings.json'
const productsLikesUrl = 'https://raw.githubusercontent.com/jttyeung/sample-apis/master/api_3/data/getLikes.json'
const productsTableHeader = ['ID',
                            'Product',
                            'Avg Rating (out of 5)',
                            '# of Ratings',
                            '# of Likes'
                            ];

// App Components
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.listen(3330, function(){
    console.log('Server running on 3330.');
});

app.get('/', (req, res, next) => {
  Promise.all([
        rp({uri: productListUrl, json:true}),
        rp({uri: productsRatingsUrl, json:true}),
        rp({uri: productsLikesUrl, json: true})
    ])
    .then(([productsNames, productsRatings, productsLikes]) => {
      res.render('index', {  productsTableHeader: productsTableHeader,
                            productsNames: productsNames,
                            productsRatings: productsRatings,
                            productsLikes: productsLikes,
                          });
    })
    .catch((err) => {
      console.log('Unable to collect data from all API endpoints for product.');
    });
});
