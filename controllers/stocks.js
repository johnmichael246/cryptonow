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
                                console.log(user)
                                res.json(user)
                            })
                        })
                } else {
                    console.log('adding stock to user array')
                    user.favStocks.push(stock);
                    user.save((err) => {
                        User.populate(user, 'favStocks', (err, user) => {
                            console.log(user)
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
    addStock
}



   // // find stock by it's api id
    //     // if stock exists
    //         // toggle if already in user.stocks
    //         if (user.favStocks.id(stock._id)) {
    //             user.favStocks.id(stock._id).remove();
    //             //save user
    //             // populate user
    //             res.json(user);
    //         } else {
    //             user.favStocks.push(stock._id);
    //             //save user
    //             // populate user
    //             res.json(user);
    //         }
    //     // else, stock doesn't exist
    //         // create stock
    //             user.favStocks.push(stock._id);
    //             //save user
    //             // populate user
    //             res.json(user);


