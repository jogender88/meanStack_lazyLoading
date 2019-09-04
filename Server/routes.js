var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var usersSchema = require('./Schema');
var jwt = require('jsonwebtoken');
mongoose.set('useFindAndModify', false);
var users = usersSchema.user;

router.get('/', function (req, res) {
    res.redirect('/login');
});
var dataToSend = { statusCode: 200, msg: "", errorMsg: "", data: [] };

router.post("/login", (req, res) => {
    let user = req.body
    // console.log(user.username)
    jwt.sign({ user: user.username }, 'secret', { expiresIn: "300000" }, (err, token) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json({
                user: user,
                token: token
            });
        }
    })
});


router.post("/save", verifyToken, function (req, res) {
    var mod = new users(req.body);
    console.log(req.body)
            if (req.body.mode == "Save") {
                mod.save(function (err, data) {
                    if (err) {
                        console.log(JSON.stringify(err.errors))
                        dataToSend.statusCode = 500
                        dataToSend.errorMsg = "Internal Server Error";
                        res.send(dataToSend)

                    }
                    else {
                        dataToSend.data = data;
                        dataToSend.msg = "Record has been Inserted";
                        res.send(dataToSend)
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
                        }
                    }
                );
            }
        // }
    // })
});

router.post("/delete", verifyToken, function (req, res) {
    users.findByIdAndUpdate(req.body.id, { flag: 0 }, function (err, data) {
        if (err) {
            dataToSend.statusCode = 500
            dataToSend.errorMsg = "Internal Server Error";
            res.send(dataToSend)
        }
        else {
            dataToSend.msg = "Record has been deleted";
            res.send(dataToSend)
        }
    });
});

router.post("/admindelete", verifyToken, function (req, res) {
    users.deleteOne({ _id: req.body.id }, function (err, data) {
        if (err) {
            dataToSend.statusCode = 500
            dataToSend.errorMsg = "Internal Server Error";
            res.send(dataToSend)
        }
        else {
            dataToSend.msg = "Record has been deleted";
            res.send(dataToSend)
        }
    });
});

router.get("/getUser", verifyToken, function (req, res) {
    users.find({ flag: 1 }, function (err, data) {
        if (err) {
            dataToSend.statusCode = 500
            dataToSend.errorMsg = "Internal Server Error";
            res.send(dataToSend)
        }
        else {
            dataToSend.data = data
            res.send(dataToSend);
        }
    });
});

router.get("/getDeletedUser", verifyToken, function (req, res) {
    users.find({ flag: 0 }, function (err, data) {
        if (err) {
            dataToSend.statusCode = 500
            dataToSend.errorMsg = "Internal Server Error";
            res.send(dataToSend)
        }
        else {
            dataToSend.data = data
            res.send(dataToSend);
        }
    });
});


function verifyToken(req, res, next) {
    const bearerToken = req.headers['token'];
    console.log(bearerToken)
    let dateNow=new Date();
    if (typeof bearerToken !== 'undefined') {
        jwt.verify(req.headers['token'], 'secret', (err, authData) => {
            console.log(authData)
            if (err) {
                dataToSend.statusCode = 403
                dataToSend.errorMsg = "Forbidden";
                res.send(dataToSend)
            }
            else {
                next();
            }
        })
    }
    else {
        dataToSend.statusCode = 403
        dataToSend.errorMsg = "Forbidden";
        res.send(dataToSend)
    }
}

module.exports = router;