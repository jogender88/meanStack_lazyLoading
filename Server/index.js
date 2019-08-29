// var http=require('http');
// http.createServer(function(req,res){
//     res.writeHead(200,{'Content-Type':'text/plain'});
//     res.end("Hello Gemini");
// }).listen(8081);
// console.log('Server is running at');

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var usersSchema = require('./Schema');

var db = mongoose.connect('mongodb://localhost:27017/BasicCurd', { useNewUrlParser: true }, function (err, res) {
    if (err) {
        console.log(err);
    } else {
        console.log('connected');
    }
});

mongoose.set('useFindAndModify', false);
var users = usersSchema.user;
var app = express();
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));

var dataToSend = { statusCode: 200, msg: "", errorMsg: "", data: [] };

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    app.use(bodyParser.json({ limit: '5mb' }));
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post("/save", function (req, res) {
    var mod = new users(req.body);
    
    if (req.body.mode == "Save") {
        mod.save(function (err, data) {
            if (err) {
                console.log(JSON.stringify(err.errors))
                dataToSend.statusCode = 500
                dataToSend.errorMsg = "Internal Server Error";
                res.send(dataToSend)
            }
            else {
                dataToSend.data=data;
                dataToSend.msg = "Record has been Inserted";
                res.send(dataToSend)
                // res.send({ data: "Record has been Inserted" });
            }
        });
    }
    else {
        users.findByIdAndUpdate(req.body.id, { name: req.body.name, address: req.body.address },
            function (err, data) {
                if (err) {
                    dataToSend.statusCode = 500
                    dataToSend.errorMsg = "Internal Server Error";
                    res.send(dataToSend)
                }
                else {
                    dataToSend.msg = "Record has been updated";
                    res.send(dataToSend)
                    // res.send({ data: "Record has been updated" });
                }
            });
    }
});

app.post("/delete", function (req, res) {
    users.findByIdAndUpdate(req.body.id, { flag: 0 }, function (err, data) {
        if (err) {
            dataToSend.statusCode = 500
            dataToSend.errorMsg = "Internal Server Error";
            res.send(dataToSend)
        }
        else {
            dataToSend.msg = "Record has been deleted";
            res.send(dataToSend)

            // res.send({ data: "Record has been deleted" });
        }
    });
});

app.post("/admindelete", function (req, res) {
    users.deleteOne({ _id: req.body.id }, function (err, data) {
        if (err) {
            dataToSend.statusCode = 500
            dataToSend.errorMsg = "Internal Server Error";
            res.send(dataToSend)
        }
        else {
            dataToSend.msg = "Record has been deleted";
            res.send(dataToSend)
            // res.send({ data: "Record has been deleted" });
        }
    });
});

app.get("/getUser", function (req, res) {
    users.find({ flag: 1 }, function (err, data) {
        if (err) {
            dataToSend.statusCode = 500
            dataToSend.errorMsg = "Internal Server Error";
            res.send(dataToSend)
            // console.log(err)
        }
        else {
            dataToSend.data = data
            res.send(dataToSend);
        }
    });
});

app.get("/getDeletedUser", function (req, res) {
    users.find({ flag: 0 }, function (err, data) {
        if (err) {
            dataToSend.statusCode = 500
            dataToSend.errorMsg = "Internal Server Error";
            res.send(dataToSend)
        }
        else {
            dataToSend.data = data
            // console.log(dataToSend)
            res.send(dataToSend);
        }
    });
});
app.listen(8080, function () {
    console.log("App listing port 8080");
});