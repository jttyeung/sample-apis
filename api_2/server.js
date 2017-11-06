const app = require('./app');


// Port Listener
let port = process.env.PORT || 3030;

app.listen(port, function() {
  console.log('Server listening on port 3030.')
})
