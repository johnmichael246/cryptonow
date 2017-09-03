var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const SALT_ROUNDS = 6;
ObjectId= mongoose.Schema.Types.ObjectId

var userSchema = new mongoose.Schema({
  name: String,
  email: {type: String, required: true, lowercase: true, unique: true},
  password: String,
  stocks: [{type:ObjectId, ref:'Stock'}],
  articles: [{type:ObjectId, ref:'Article'}]
}, {
  timestamps: true
});


userSchema.pre('save', function(next) {
    var self = this;
    if(!self.isModified('password')) return next();
    bcrypt.hash(self.password, SALT_ROUNDS, function(err, hash) {
        if (err) return next(err);
        self.password = hash;
        next();
    });
});


module.exports = mongoose.model('User', userSchema);