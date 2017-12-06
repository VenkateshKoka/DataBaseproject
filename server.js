/**
 * Created by venkateshkoka on 12/1/17.
 */
var app = require('./express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');

app.use(bodyParser.json()); //for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application

app.use(cookieParser()); // for parsing cookies
app.use(session({ secret: 'kokadatabase' })); //process.env.SESSION_SECRET
app.use(passport.initialize());
app.use(passport.session());

app.use(app.express.static(__dirname + '/public/'));

require('./assignment/app');

var port = process.env.PORT || 3000;
app.listen(port);