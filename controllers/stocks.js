var Stock = require('../models/stock');
var User = require('../models/user');
var baseStockURL = 'https://api.coinmarketcap.com/v1/ticker/?limit=10'
var stockURL = 'https://api.coinmarketcap.com/v1/ticker/'
var request = require('request');

function getStocks(req, res) {
    var options = {
        url: `${baseStockURL}`
    }
    request(options.url, (err, response, body) => {
        let stocks = JSON.parse(body)
        console.log(stocks)
        res.send(stocks)
    })
}
function getOneStock(req, res) {
    var options = {
        url: `${stockURL}${req.params.id}`
    }
    request(options.url, (err, response, body) => {
        let stock = JSON.parse(body)
        res.send(stock)
    })
}

function addStock(req, res) {
  console.log('hitting here')
  console.log(req.body)
//   User.populate(req.user._id, 'favstocks', (err,user) => {
//       user.favstocks.indexOf()
//   })
  User.findById(req.user._id, (err, user) => {
  console.log(req.body)
    if(err) console.log(err);
    res.json(user)
  })
}




module.exports = {
    getStocks,
    getOneStock,
    addStock
}