var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//mongoose.connect("mongodb://heroku_jnd02wv9:k785cnurv2i356sf6qv41p2gll@ds143071.mlab.com:43071/heroku_jnd02wv9");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/DuckTails");

module.exports = { mongoose };