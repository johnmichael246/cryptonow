var router = require('express').Router();
var stocksCtrl = require('../../controllers/stocks');


router.get('/', stocksCtrl.getStocks)
router.get('/:id', stocksCtrl.getOneStock)


module.exports = router