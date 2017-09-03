var mongoose = require('mongoose');


var articleSchema = new mongoose.Schema({
  name: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Article', articleSchema);