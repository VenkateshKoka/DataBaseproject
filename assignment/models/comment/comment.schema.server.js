/**
 * Created by venkateshkoka on 12/6/17.
 */
var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    username: {type:String},
    _movie: {type: String},
    commentBody: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "database_project_comment"});

module.exports = commentSchema;