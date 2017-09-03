var mongoose = require('mongoose');


var stockSchema = new mongoose.Schema({
  name: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Stock', stockSchema);
