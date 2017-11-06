const express = require('express'),
  router = express.Router(),
  bodyParser = require('body-parser'),
  Url = require('./datamodel'),
  redis = require('redis'),
  http = require('http');
  // downloadHtml = require('./downloadHtml');

router.use(bodyParser.urlencoded({extended: true}));

// Creates a new URL entry
router.post('/url', (req, res) => {

  let url = req.body.url;
  console.log('url: ' + url)
  let html = '';

  http.get(url, (response) => {
            response.on('data', (chunk) => {
              html += chunk;
              console.log('html chunk: ' + html);
            });
            response.on('end', () => {
              Url.create({
                url: url,
                html: html
          //     },
          //     (err, url) => {
          //       if (err) return response.sendStatus(500).send('There was an issue saving this URL\'s data in the database.');
          //       res.sendStatus(200).send(url);
              })
            })
          // }).on('error', (err) => {
          //   console.log("Got error: " + err.message);
          });

  console.log('after html: ' + html)



});

// Returns a URL data given an ID
router.get('/urls/:id', (req, res) => {
  Url.findById(req.params.id, (err, urlid) => {
    if (err) return res.sendStatus(500).send('There was an issue finding the id.');
    if (!urlid) return res.sendStatus(404).send('No such id was found.')
    res.status(200).send(urlid);
  });
});

module.exports = router;
