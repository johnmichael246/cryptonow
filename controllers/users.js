var User = require('../models/user')
var jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET


function createJWT(user) {
    return jwt.sign(
        { user },
        SECRET,
        {expiresIn: '24h'}
    );
}

function signup(req,res) {
    const user = new User(req.body)
    user.save()
    .then(user => {
        return res.json({token: createJWT(user)})
    })
    .catch(err => res.status(400).json(err))
}

function login(req, res) {
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

function populateUser(req, res) {
  console.log('calling populateUser')
  User.findById(req.user._id, (err, user) => {
    User.populate(user, 'favStocks', (err, user) => {
      res.json(user);
    })
  })
}
function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'not authenticated'});
}


module.exports = {
  signup,
  login,
  populateUser,
  checkAuth
}