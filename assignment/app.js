/**
 * Created by venkateshkoka on 12/1/17.
 */

var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/DatabaseProjectdb'; // for local
if(process.env.MLAB_USERNAME_DATABASE) { // check if running remotely
    var username = process.env.MLAB_USERNAME_DATABASE; // get from environment
    var password = process.env.MLAB_PASSWORD_DATABASE;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds133166.mlab.com:33166/heroku_q2xh7qv0'; // user yours

}
mongoose.connect(connectionString);
mongoose.Promise = require('q').Promise;



require('./services/user.service.server');
// require('./services/recipe.service.server');
// require('./services/comment.service.server');
// require('./services/recipe.service.server');
