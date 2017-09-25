var router = require('express').Router();
var stocksCtrl = require('../../controllers/stocks');


router.get('/', stocksCtrl.populateDatabase)



module.exports = router