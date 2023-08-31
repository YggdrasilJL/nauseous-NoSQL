const { connect, connection } = require('mongoose');

connect('mongodb://localhost:27017/social_network');

module.exports = connection;
