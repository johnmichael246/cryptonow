const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./config/database');

const app = express();

app.use(logger('dev'));


app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json());


app.use(require('./config/auth'));

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/news', require('./routes/api/news'));
app.use('/api/stocks', require('./routes/api/stocks'));
app.use('/api/stockVisualizeData', require('./routes/api/stockVisualizeData'));
app.use('/api/favStocks', require('./routes/api/favStocks'));



app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});