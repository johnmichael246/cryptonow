var Stock = require('../models/stock');
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
        // console.log(req.params)
        let stock = JSON.parse(body)
        res.send(stock)
    })
}




module.exports = {
    getStocks,
    getOneStock
}