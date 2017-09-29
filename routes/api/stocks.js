var router = require('express').Router();
var stocksCtrl = require('../../controllers/stocks');


router.get('/', stocksCtrl.getStocks)
router.get('/:id', stocksCtrl.getOneStock)
router.post('/:id/:currency', stocksCtrl.getOneStockCurrency)
router.post('/:id', stocksCtrl.addStock)


module.exports = router