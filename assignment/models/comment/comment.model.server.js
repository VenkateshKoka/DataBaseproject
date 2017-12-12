/**
 * Created by venkateshkoka on 12/6/17.
 */

var mongoose = require('mongoose');
var commentSchema = require('./comment.schema.server');
var commentModel = mongoose.model('ProjectCommentModel', commentSchema);
var movieModel =require('../movie/movie.model.server');



commentModel.createComment = createComment;
commentModel.findCommentsFormovie = findCommentsFormovie;
commentModel.deleteComment = deleteComment;
commentModel.findAllComments = findAllComments;


module.exports = commentModel;

function createComment(comment,movieId,username) {

    comment._movie = movieId;
    comment.username = username;
    // comment.movie = moviename;
    comment.commentBody = comment.commentBody;
    return commentModel
        .create(comment);
    
}

function findAllComments() {
    return commentModel.find();
}

function findCommentsFormovie(movieId) {
    return commentModel
        .find({_movie:movieId});
}

function deleteComment(movieId,commentId) {
    return commentModel
        .remove({_id: commentId})
}
