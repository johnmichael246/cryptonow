var Stock = require('../models/stock');
var User = require('../models/user');
var stockURL = 'https://api.coinmarketcap.com/v1/ticker/';
var request = require('request');

function getStocks(req, res) {
    request(stockURL, (err, response, body) => {
        let stocks = JSON.parse(body)
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

function getOneStockCurrency(req, res) {
    var options = {
        url: `${stockURL}${req.params.id}/?convert=${req.params.currency}`
    }
    console.log(options.url)
    request(options.url, (err, response, body) => {
        let stock = JSON.parse(body)
        console.log(stock)
        res.send(stock)
    })
}

function getFavStocks(req,res) {
    let favStockArray = req.body.stocks.map( function(stock) {
        console.log('promise for',stock.apiId)
        return new Promise(function(resolve, reject) {
            request(`${stockURL}${stock.apiId}/`, function (err, response, body) {
                let coin = JSON.parse(body)
                resolve(coin)
            })
        })
    })
    Promise.all(favStockArray)
    .then(data => {
        let reducedData = data.reduce(function(arr1,arr2) {
            return arr1.concat(arr2);
        })
        res.json(reducedData)
    })
}

function populateGraph(req,res) {
    Stock.find({apiId:req.body.id}, (err, stock)=> {
        console.log('stocks are', stock[0].closingStockValues)

        res.json(stock[0].closingStockValues);
    })
}

function addStock(req, res) {
    User.findById(req.user._id, (err,user) => {
        Stock.findOne({apiId:req.body.id}, (err, stock) => {
            if(stock) {
                if(err)console.log(err);
                if(stock.symbol === undefined) {
                    stock.symbol = req.body.stockSymbol
                    stock.save()
                }

                let idChecker = user.favStocks.findIndex(id => id.equals(stock._id))
                if(idChecker > -1) {
                        user.favStocks.splice(idChecker, 1);
                        user.save(err => {
                            if(err)console.log(err)
                            User.populate(user, 'favStocks', (err, user)=> {
                                res.json(user)
                            })
                        })
                } else {
                    user.favStocks.push(stock);
                    user.save((err) => {
                        User.populate(user, 'favStocks', (err, user) => {
                            res.json(user)
                        })
                    });
                }
            } else {
                let coin = new Stock({
                    name:req.body.name,
                    symbol:req.body.stockSymbol,
                    apiId:req.body.id
                })
                coin.save( (err, coin) => {
                    user.favStocks.push(coin._id);
                    user.save(err => {
                        User.populate(user, 'favStocks', (err, user)=> {
                            res.json(user)
                        })
                    })
                })
            }
        })
    })
}




module.exports = {
    getStocks,
    getOneStock,
    addStock,
    getFavStocks,
    getOneStockCurrency,
    populateGraph
}


