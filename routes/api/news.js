var router = require('express').Router();
var newsCtrl = require('../../controllers/news');

router.get('/', newsCtrl.getArticles)
router.get('/:id', newsCtrl.getOneArticle)

module.exports = router
