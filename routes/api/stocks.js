var router = require('express').Router();
var stocksCtrl = require('../../controllers/stocks');


router.get('/', stocksCtrl.getStocks)
router.get('/:id', stocksCtrl.getOneStock)
router.post('/:id', stocksCtrl.addStock)
router.post('/:id/currency/:currency', stocksCtrl.getOneStockCurrency)


module.exports = router