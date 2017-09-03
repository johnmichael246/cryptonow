var Article = require('../models/article');
let newsURL = 'https://newsapi.org/v1/articles?source=techcrunch&language=en'
var request = require('request');

function getArticles(req, res) {
    console.log('hitting here ')
    var options = {
        url: `${newsURL}&apiKey=${process.env.NEWS_KEY}`
    }
    request(options.url, (err, response, body) => {
        let news = JSON.parse(body)
        console.log(news)
        res.send(news)
    })
}




module.exports = {
    getArticles
}