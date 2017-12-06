/**
 * Created by venkateshkoka on 12/6/17.
 */
var bcrypt = require("bcrypt-nodejs");
var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);



app.get('/api/project/user', isAdmin, findAllUsers);
app.post('/api/project/user', isAdmin,createUser );
app.get('/api/project/user/:userId', findUserById);
app.put('/api/project/user/:userId',updateUser);
app.delete ('/api/project/user/:userId', isAdmin, deleteUser);
// app.get('/api/follow/user/:username',findAllUsersToFollow);
// app.post('/api/follow/:mainusername/by/:followerusername',follow);
// app.post('/api/unfollow/:mainusername/by/:followerusername',unfollow);
// app.get('/api/follow/username/:username',findFollowUserByUsername);
// app.get('/api/isFollower/:mainusername/of/:followerusername',isFollower);

app.post  ('/api/project/login', passport.authenticate('local'), login);
app.get('/api/project/loggedin',loggedin);
app.get('/api/project/checkAdmin',checkAdmin);

app.post  ('/api/project/logout',logout);
app.post ('/api/project/register',register);
app.post ('/api/project/register/critic',registerAsCritic);
app.post ('/api/project/register/admin',registerAsAdmin)

app.post('/api/project/unregister',unregister);

function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(
            function(user) {
                if(user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function(error) {
                done(null,false);
            }
        );
}

//
// function follow(req,res) {
//     var mainusername = req.params.mainusername;
//     var followerusername = req.params.followerusername;
//     userModel
//         .follow(mainusername,followerusername)
//         .then(function (user) {
//             res.json(user);
//         }, function (error) {
//             res.sendStatus(500);
//         });
// }
//
// function unfollow(req,res) {
//     var mainusername = req.params.mainusername;
//     var followerusername = req.params.followerusername;
//     userModel
//         .unfollow(mainusername,followerusername)
//         .then(function (user) {
//             res.json(user);
//         }, function (error) {
//             res.sendStatus(500);
//         });
// }
//
// function isFollower(req,res) {
//     var mainusername = req.params.mainusername;
//     var followerusername = req.params.followerusername;
//     userModel.isFollower(mainusername,followerusername)
//         .then(function (index) {
//             if(index != undefined){
//                 res.send("index");
//             }
//             else {
//                 res.send(undefined);
//             }
//
//         }),function (error) {
//         res.sendStatus(500);
//     }
// }





function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1){
        next();
    }
    else {
        res.sendStatus(401);
    }
}

function login(req,res) {
    res.json(req.user);
}

function logout(req,res) {
    req.logout();
    res.sendStatus(200);
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function loggedin(req,res) {
    // console.log("I am in server service");
    if(req.isAuthenticated()){
        res.send(req.user)
    } else {
        res.send('0');
    }
}

function checkAdmin(req,res) {
    // console.log("I am in server service");
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1){
        res.send(req.user)
    } else {
        res.send('0');
    }
}

function unregister(req,res) {

    userModel
        .deleteUser(req.user._id)
        .then(function (user) {
            req.logout();
            res.sendStatus(200);
        })
}

function register(req,res) {
    var userObj = req.body;
    userObj.password = bcrypt.hashSync(userObj.password);
    userModel
        .createUser(userObj)
        .then(function (user) {
            req.login(user,function (status) {
                res.send(status);
            })
        })
}

function registerAsCritic(req,res) {
    var userObj = req.body;
    userObj.password = bcrypt.hashSync(userObj.password);
    userModel
        .createUserAsCritic(userObj)
        .then(function (user) {
            req.login(user,function (status) {
                res.send(status);
            })
        })
}

function registerAsAdmin(req,res) {
    var userObj = req.body;
    userObj.password = bcrypt.hashSync(userObj.password);
    userModel
        .createUserAsAdmin(userObj)
        .then(function (user) {
            req.login(user,function (status) {
                res.send(status);
            })
        })
}





function deleteUser(req, res) {

    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status);
        });
}

function updateUser(req,res) {
    var user = req.body;

    userModel
        .updateUser(req.params.userId, user)
        .then(function (status) {
            res.send(status);
        });
}

function createUser(req,res) {
    var user = req.body;

    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
}


function  findUserById(req, res) {
    var userId = req.params['userId'];

    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
}

// function findAllUsersToFollow(req,res) {
//     var username = req.params.username;
//     userModel
//         .findAllUsersToFollow(username)
//         .then(function (users) {
//             res.send(users);
//         });
// }

// function findFollowUserByUsername(req,res) {
//     var username = req.params.username;
//     userModel.findFollowUserByUsername(username).then(function (user) {
//         res.send(user);
//     })
// }

function findAllUsers (req,res) {
    var username = req.query['username'];
    var password = req.query.password;

    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else if(username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            });
    }
};



