var mongoose = require('mongoose');

var valueSchema = new mongoose.Schema({
  bitcoinValue:Number,
  value:Number,
  day:Date
})

var stockSchema = new mongoose.Schema({
  name: String,
  apiId:String,
  symbol:String,
  closingStockValues:[valueSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Stock', stockSchema);
