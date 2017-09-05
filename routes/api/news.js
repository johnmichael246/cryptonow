var router = require('express').Router();
var newsCtrl = require('../../controllers/news');

let newsURL ='https://newsapi.org/v1/articles'

router.get('/', newsCtrl.getArticles)
router.get('/:id', newsCtrl.getOneArticle)

module.exports = router
