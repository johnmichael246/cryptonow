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
  User.populate(req.user._id, 'favStocks', (err,user) => {
      console.log(req.user.favStocks)
      console.log(req.user)
      if (!req.user.favStocks.includes(req.body.id) ) {
          console.log('the stocks not here')
          Stock.create({id:req.body.id}, (err,coin) => {   
              if(err)console.log(err)
                  req.user.favStocks.push(coin);
                  console.log(req.user);
                  user.save(err => {
                  if(err) console.log(err)
                  console.log('the coins value is: ',coin.id)
                  res.send('ok')
                  })
            })
        } else {
            console.log('that stock is here already')
            res.send('boo')
        }
    })
}




module.exports = {
    getStocks,
    getOneStock,
    addStock
}