var User = require('../models/user');
var Stock = require('../models/stock');
var jwt = require('jsonwebtoken');
var SECRET = process.env.SECRET;


function createJWT(user) {
    return jwt.sign(
        {user},
        SECRET,
        {expiresIn: '24h'}
    );
}

function signup(req,res) {
    var user = new User(req.body);
    user.save()
    .then(user => {
        return res.json({token: createJWT(user)});
    })
    .catch(err => res.status(400).json(err));
}

function login(req, res) {

console.log(req.body)

  User.findOne({email: req.body.email}).exec().then(user => {
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        res.json({token: createJWT(user)});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  }).catch(err => res.status(401).json(err));
}

function populateUser(req,res) {
  console.log('hitting populate user path')
  User.findById(req.user._id, (err, user) => {
    User.populate(user, 'favStocks', (err, user) => {
      console.log(user)
      res.json(user);
    })
  })
}


module.exports = {
    signup,
    login,
    populateUser
}