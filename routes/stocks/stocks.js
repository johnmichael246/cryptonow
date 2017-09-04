var router = require('express').Router();
var stocksCtrl = require('../../controllers/stocks');

let newsURL ='https://newsapi.org/v1/articles'

router.get('/', stocksCtrl.getStocks)


module.exports = router