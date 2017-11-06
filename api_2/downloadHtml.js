let getHtml = (url) => {

  let options = {
    host: url,
    port: 80,
    path: '/',
  };

  http.get(options, (res) => {
    res.on("data", (chunk) => {
      console.log("BODY: " + chunk);
    });
  }).on('error', (err) => {
    console.log("Got error: " + err.message);
  });

};

module.exports = downloadHtml;
