var Stock = require('../models/stock');
var User = require('../models/user');
var baseStockURL = 'https://api.coinmarketcap.com/v1/ticker/'
var stockURL = 'https://api.coinmarketcap.com/v1/ticker/'
var request = require('request');

function getStocks(req, res) {
    request(baseStockURL, (err, response, body) => {
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
        url: `${stockURL}${req.body.id}/?convert=${req.body.currency}`
    }
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

// function populateDatabase(req,res) {
//     console.log('hitting path to populate database with all stocks');
//     request(stockURL, (err, response, body) => {
//         let coins = JSON.parse(body);
//         console.log(coins)
//         coins.map( coin => {
//             Stock.findOne({apiId:coin.id}, (err, stock) => {
//                 if (stock) {
//                     console.log(stock.name,'exists, being updated')
//                     let todaysDate = new Date().toDateString();
//                     stock.closingStockValues.push({
//                         day:todaysDate,
//                         value:coin.price_usd || 0,
//                         bitcoinValue:coin.price_btc || 0 
//                     })
//                     stock.save( (err, stock)=> {
//                         if(err) console.log(err);
//                         console.log(stock.name,'has been updated with values,',stock.closingStockValues)         
//                     })
//                     console.log('the stock', stock.name, 'exists')

//                 if (err) console.log(err);  
//                 } else {
//                     console.log('creating the stock')
//                     let newCoin = new Stock({
//                         name:coin.name,
//                         symbol:coin.stockSymbol,
//                         apiId:coin.id
//                     })
//                     let todaysDate = new Date().toDateString();
//                     newCoin.closingStockValues.push({
//                         day:todaysDate,
//                         value:coin.price_usd || 0,
//                         bitcoinValue:coin.price_btc || 0
//                     })
//                     newCoin.save( (err, coin)=> {
//                         if(err) console.log(err)
//                         console.log('coin created', coin.closingStockValues)
//                     })
//                 }
//             })
//         })
//     })
// }

function addStock(req, res) {
    User.findById(req.user._id, (err,user) => {
        Stock.findOne({apiId:req.body.id}, (err, stock) => {
            if(stock) {
                console.log('the stock exists')
                if(err)console.log(err);
                let idChecker = user.favStocks.findIndex(id => id.equals(stock._id))
                if(idChecker > -1) {
                    console.log('removing stock from user array')
                        user.favStocks.splice(idChecker, 1);
                        user.save(err => {
                            if(err)console.log(err)
                            User.populate(user, 'favStocks', (err, user)=> {
                                // console.log(user)
                                res.json(user)
                            })
                        })
                } else {
                    console.log('adding stock to user array')
                    user.favStocks.push(stock);
                    user.save((err) => {
                        User.populate(user, 'favStocks', (err, user) => {
                            // console.log(user)
                            res.json(user)
                        })
                    });
                }
            } else {
                console.log('the stock is not here')
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
    getOneStockCurrency
    // populateDatabase
}


