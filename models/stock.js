var mongoose = require('mongoose');


var stockSchema = new mongoose.Schema({
  name: String,
  apiId:String,
  symbol:String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Stock', stockSchema);
