const { connect, connection } = require('mongoose');
require('dotenv').config();

connect('mongodb://localhost/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
