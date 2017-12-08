/**
 * Created by venkateshkoka on 12/6/17.
 */

var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
    movieId : String,
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"},
    _createdUser: String,
    name: String,
    runtime :{type:Number, default:0},
    vote_average :{type:Number, default:0},
    vote_count :{type:Number, default:0},
    imageURL :String,
    overview:String,
    comments:[{type: mongoose.Schema.Types.ObjectId,ref:"ProjectCommentModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'database_project_movie'});

module.exports = movieSchema;