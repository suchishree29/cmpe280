/**
 * Created by Suchishree Jena on 11/21/2017.
 */
var express = require('express'),
    app = express();
var path = require('path');
var http = require('http');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const port = 8000;
var routes = require('./routes/routes');


app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Connect to mongodb database
mongoose.connect('localhost:27017/cmpe280');

//on connection
mongoose.connection.on('connected',function () {
    console.log('Connected to database mongodb');
});

//on error
mongoose.connection.on('error',function (err) {
    if(err){
        console.log('Error in Database connection' +err);
    }
});

app.use('/', routes);
app.listen(port,function () {
    console.log('Server started at port:' +port);
});
