// var http=require('http');
// http.createServer(function(req,res){
//     res.writeHead(200,{'Content-Type':'text/plain'});
//     res.end("Hello Gemini");
// }).listen(8081);
// console.log('Server is running at');

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var api=require("./routes");
var db = mongoose.connect('mongodb://localhost:27017/BasicCurd', { useNewUrlParser: true }, function (err, res) {
    if (err) {
        console.log(err);
    } else {
        console.log('connected');
    }
});

mongoose.set('useFindAndModify', false);
var app = express();
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,token');
    app.use(bodyParser.json({ limit: '5mb' }));
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/',api);

app.listen(8080, function () {
    console.log("App listing port 8080");
});