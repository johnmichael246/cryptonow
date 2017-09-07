var router = require('express').Router();
var stocksCtrl = require('../../controllers/stocks');


router.post('/', stocksCtrl.getFavStocks)



module.exports = router