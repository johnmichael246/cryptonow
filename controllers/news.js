var Article = require('../models/article');
let baseNewsURL = 'https://newsapi.org/v1/articles?category=technology&source=techcrunch&language=en'
let newsURL = 'https://newsapi.org/v1/articles?'
var request = require('request');

function getArticles(req, res) {
    var options = {
        url: `${baseNewsURL}&apiKey=${process.env.NEWS_KEY}`
    }
    request(options.url, (err, response, body) => {
        let news = JSON.parse(body)
        res.send(news)
    })
}
function getOneArticle(req, res) {
    console.log('hitting here ')
    var options = {
        url: `${baseNewsURL}&apiKey=${process.env.NEWS_KEY}&title=${req.body.title}`
    }
    request(options.url, (err, response, body) => {
        let news = JSON.parse(body)
        res.send(news)
    })
}




module.exports = {
    getArticles,
    getOneArticle
}