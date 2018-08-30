var Stock = require('../models/stock');
var User = require('../models/user');
var stockURL = 'https://api.coinmarketcap.com/v2/ticker/';
var request = require('request');

function getStocks(req, res) {
    request(stockURL, (err, response, body) => {
        if(err) {
            res.status(500)
            res.send(err)
        } else {
            let data = JSON.parse(body)
            if (data.metadata.error) {
                res.status(422)
                res.send(data.metadata.error)
            } else {
                let stocks = Object.values(data.data)
                stocks.forEach(item => {
                    let market_info = Object.keys(item.quotes.USD)
                    market_info.forEach(record => {
                        item[record] = item.quotes.USD[record]
                    })
                })
                res.status(200)
                res.send(stocks)
            }
        }
    })
}

function getOneStock(req, res) {
    const options = {
        url: `${stockURL}${req.params.id}`
    }
    request(options.url, (err, response, body) => {
        if(err) {
            res.status(500)
            res.send(err)
        } else {
            let data = JSON.parse(body)
            if (data.metadata.error) {
                res.status(422)
                res.send(data.metadata.error)
            } else {
                let stock = [data.data]
                stock.forEach(item => {
                    let market_info = Object.keys(item.quotes.USD)
                    market_info.forEach(record => {
                        item[record] = item.quotes.USD[record]
                    })
                })
                res.status(200)
                res.send(stock)
            }
        }
    })
}

function getOneStockCurrency(req, res) {
    const options = {
        url: `${stockURL}${req.params.id}/?convert=${req.params.currency}`
    }
    request(options.url, (err, response, body) => {
        if (err) {
            res.status(422)
        } else {
            let data = JSON.parse(body)
            if (data.metadata.error) {
                res.status(422)
                res.send(data.metadata.error)
            } else {
                let stock = [data.data]
                stock.forEach(item => {
                    let market_info = Object.keys(item.quotes.USD)
                    market_info.forEach(record => {
                        item[record] = item.quotes.USD[record]
                    })
                })
                res.status(200)
                res.send(stock)
            }
        }
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
    Stock.findOne({ apiId:req.body.id }, (err, stock)=> {
        if (err) {
            console.log(err)
            return
        }
        if (stock) {
            res.status(200)
            res.json(stock.closingStockValues)
        } else {
            res.status(422)
        }
    })
}

function addStock(req, res) {
    User.findById(req.user._id, (err,user) => {
        Stock.findOne({ apiId:req.body.id }, (err, stock) => {
            if(err) {
                console.log(err)
                return
            }
            if(stock) {
                let requestedStockId = user.favStocks.findIndex(id => id.equals(stock._id))
                if(requestedStockId > -1) {
                    console.log('stock in favorites array, REMOVE')
                        user.favStocks.splice(requestedStockId, 1);
                        user.save(err => {
                            if(err) {
                                console.log(err)
                                res.status(422)
                            } else {
                                User.populate(user, 'favStocks', (err, user)=> {
                                    res.json(user).status(200)
                                })
                            }
                        })
                } else {
                    console.log('stock not in favorites array, ADD')
                    user.favStocks.push(stock)
                    user.save(err => {
                        if (err) {
                            console.log(err)
                            res.status(422)
                        } else {
                            User.populate(user, 'favStocks', (err, user) => {
                                res.json(user).status(200)
                            })
                        }
                    });
                }
            } else {
                let coin = new Stock({
                    name:req.body.name,
                    symbol:req.body.stockSymbol,
                    apiId:req.body.id
                })
                coin.save((err, coin) => {
                    user.favStocks.concat([coin._id]);
                    user.save(err => {
                        if (err) {
                            console.log(err)
                        } else {
                            User.populate(user, 'favStocks', (err, user)=> {
                                res.json(user).status(200)
                            })
                        }
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


