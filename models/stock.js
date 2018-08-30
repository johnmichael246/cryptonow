var mongoose = require('mongoose');

var valueSchema = new mongoose.Schema({
  bitcoinValue:Number,
  value:Number,
  day:Date
})

var stockSchema = new mongoose.Schema({
  name: String,
  apiId:Number,
  symbol:String,
  closingStockValues:[valueSchema]
}, {
  timestamps: true,
  usePushEach:true
})

module.exports = mongoose.model('Stock', stockSchema);
