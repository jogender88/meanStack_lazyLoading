var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var usersSchema = require('./Schema');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

mongoose.set('useFindAndModify', false);
var users = usersSchema.user;
var signup = usersSchema.signup;
router.get('/', function(req, res) {
    res.redirect('/login');
});
var dataToSend = { statusCode: 200, msg: "", errorMsg: "", data: [] };

var courseDescription = {
    heading: 'Best Android Training Center & Institute',
    desc: "Android devices are everywhere, and it's very likely that you are reading this on an Android device and if the working and if and hows about it fascinates you then you are at the right place. Android OS powers around 85% of smartphones in the current market and the ever ending demand for Android application whether it be e-commerce, news, games or an informative app about a particular business is ever increasing. Android is an open source OS providing developers with fluidity and ease to develop applications. At this present time, there are nearly more than 1 billion active android devices.",
    whyCourse: [{
            1: "If the working of a smartphone fascinates you, If the exciting world of apps catches your interest If like others you want to build an app that makes people life easier then Android development is undoubtedly for you."
        },
        {
            2: "If the working of a smartphone fascinates you, If the exciting world of apps catches your interest If like others you want to build an app that makes people life easier then Android development is undoubtedly for you.",
        },
        {
            3: "If the working of a smartphone fascinates you, If the exciting world of apps catches your interest If like others you want to build an app that makes people life easier then Android development is undoubtedly for you.",
        },
    ]
}

router.post("/getData", (req, res) => {
    console.log(req.body)
    if (req.body.id == 'php') {
        dataToSend.data = courseDescription
        res.send(dataToSend)

    } else {
        dataToSend.data = [];
        res.send(dataToSend)
    }
})
router.post("/signup", (req, res) => {
    let user = req.body
    signup.find({ username: user.username })
        .exec()
        .then(data => {
            if (data.length >= 1) {
                dataToSend.statusCode = 409
                dataToSend.errorMsg = "Username not available";
                res.send(dataToSend)
            } else {
                bcrypt.hash(user.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const signin = new signup({
                            username: user.username,
                            password: hash
                        });
                        signin.save()
                            .then(() => {
                                signToken(user)
                                    .then((responseToken) => {
                                        res.json({
                                            statusCode: 200,
                                            user: user,
                                            token: responseToken
                                        });
                                    })
                                    .catch(err => {
                                        dataToSend.statusCode = 500
                                        dataToSend.errorMsg = "Error during Signup";
                                        res.send(dataToSend)
                                    })
                            })
                    }
                });
            }
        });
});

router.post("/login", (req, res) => {

    let user = req.body


    signup.findOne({ username: user.username })
        .exec()
        .then(data => {
                if (data) {
                    bcrypt.compare(user.password, data.password, (err, result) => {
                        if (err) {
                            dataToSend.statusCode = 401
                            dataToSend.errorMsg = "Invalid Username or Password";
                            return res.send(dataToSend)
                        }
                        if (result) {
                            signToken(data)
                                .then(responseToken => {
                                    return res.json({
                                        statusCode: 200,
                                        user: user,
                                        token: responseToken
                                    });
                                })
                        } else {
                            dataToSend.statusCode = 401
                            dataToSend.errorMsg = "Invalid Username or Password";
                            return res.send(dataToSend)

                        }
                    })
                }
            },
            err => {
                dataToSend.statusCode = 401
                dataToSend.errorMsg = "Invalid Username or Password";
                res.send(dataToSend)

            })
        .catch((err) => {
            res.send(err)
            console.log("-----Error-------", err);
        })
});


router.post("/save", verifyToken, function(req, res) {
    var mod = new users(req.body);
    if (req.body.mode == "Save") {
        mod.save(function(err, data) {
            if (err) {
                console.log(JSON.stringify(err.errors))
                dataToSend.statusCode = 500
                dataToSend.errorMsg = "Internal Server Error";
                res.send(dataToSend)
            } else {
                dataToSend.statusCode = 200

                dataToSend.data = data;
                dataToSend.msg = "Record has been Inserted";
                res.send(dataToSend)
            }
        });
    } else {
        users.findByIdAndUpdate(req.body.id, { name: req.body.name, address: req.body.address },
            function(err, data) {
                if (err) {
                    dataToSend.statusCode = 500
                    dataToSend.errorMsg = "Internal Server Error";
                    res.send(dataToSend)
                } else {
                    dataToSend.statusCode = 200

                    dataToSend.msg = "Record has been updated";
                    res.send(dataToSend)
                }
            }
        );
    }
});

router.post("/delete", verifyToken, function(req, res) {
    users.findByIdAndUpdate(req.body.id, { flag: 0 }, function(err, data) {
        if (err) {
            dataToSend.statusCode = 500
            dataToSend.errorMsg = "Internal Server Error";
            res.send(dataToSend)
        } else {
            dataToSend.statusCode = 200
            dataToSend.msg = "Record has been deleted";
            res.send(dataToSend)
        }
    });
});

router.post("/admindelete", verifyToken, function(req, res) {
    users.deleteOne({ _id: req.body.id }, function(err, data) {
        if (err) {
            dataToSend.statusCode = 500
            dataToSend.errorMsg = "Internal Server Error";
            res.send(dataToSend)
        } else {
            dataToSend.statusCode = 200
            dataToSend.msg = "Record has been deleted";
            res.send(dataToSend)
        }
    });
});

router.get("/getUser", verifyToken, function(req, res) {
    users.find({ flag: 1 }, function(err, data) {
        if (err) {
            dataToSend.statusCode = 500
            dataToSend.errorMsg = "Internal Server Error";
            res.send(dataToSend)
        } else {
            dataToSend.statusCode = 200

            dataToSend.data = data
            res.send(dataToSend);
        }
    });
});

router.get("/getDeletedUser", verifyToken, function(req, res) {
    users.find({ flag: 0 }, function(err, data) {
        if (err) {
            dataToSend.statusCode = 500
            dataToSend.errorMsg = "Internal Server Error";
            res.send(dataToSend)
        } else {
            dataToSend.data = data
            res.send(dataToSend);
        }
    });
});

function signToken(response) {
    return new Promise((resolve, reject) => {
        jwt.sign({ user: response.username }, 'secret', { expiresIn: "1d" }, (err, token) => {
            if (err) {
                reject(err)
            } else {
                resolve(token)
            }
        });
    });
}

function verifyToken(req, res, next) {
    const bearerToken = req.headers['token'];
    if (typeof bearerToken !== 'undefined') {
        jwt.verify(req.headers['token'], 'secret', (err, authData) => {
            if (err) {
                dataToSend.statusCode = 403;
                dataToSend.errorMsg = "Forbidden";
                res.send(dataToSend)
            } else {
                next();
            }
        })
    } else {
        dataToSend.statusCode = 403
        dataToSend.errorMsg = "Forbidden";
        res.send(dataToSend)
    }
}

module.exports = router;