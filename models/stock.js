var mongoose = require('mongoose');


var stockSchema = new mongoose.Schema({
  name: String,
  id:String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Stock', stockSchema);
