/**
 * Created by venkateshkoka on 12/6/17.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    roles : [{type:String, default:'USER', enum :['USER','ADMIN','CRITIC']}],
    email: String,
    movies: [{type: mongoose.Schema.Types.ObjectId, ref: "ProjectMovieModel"}],
    follows: [{type:String}],
    followedBy: [{type:String}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "database_project_users"});

module.exports = userSchema;