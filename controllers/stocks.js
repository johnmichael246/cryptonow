var Stock = require('../models/stock');
var stockURL = 'https://api.coinmarketcap.com/v1/ticker/?limit=10'
var request = require('request');

function getStocks(req, res) {
    var options = {
        url: `${stockURL}`
    }
    request(options.url, (err, response, body) => {
        let stocks = JSON.parse(body)
        console.log(stocks)
        res.send(stocks)
    })
}




module.exports = {
    getStocks
}