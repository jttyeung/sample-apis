let config = require('./config'),
  mongoose = require('mongoose'),

  promise = mongoose.connect('mongodb://' + config.mongodb.username+ ':' + config.mongodb.password + '@cluster0-shard-00-00-kfziq.mongodb.net:27017,cluster0-shard-00-01-kfziq.mongodb.net:27017,cluster0-shard-00-02-kfziq.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', {
    useMongoClient: true,
  });
