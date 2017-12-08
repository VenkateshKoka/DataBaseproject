/**
 * Created by venkateshkoka on 12/7/17.
 */


var app = require('../../express');

app.post('/api/project/user/:username/movie/:movieId/comment',createComment);
app.get('/api/project/user/movie/:movieId/comments',findCommentsForMovie);
app.delete('/api/project/user/movie/:movieId/comment/:commentId',deleteComment);
app.get('/api/all/comments',findAllComments);
var commentModel = require('../models/comment/comment.model.server');


function createComment(req,res) {
    var movieId = req.params.movieId;
    var username = req.params.username;
    var comment = req.body;

    // console.log(recipeId+username+comment);

    commentModel.createComment(comment,movieId,username)
        .then(function (comment) {
            res.send(comment);
        })
}

function findAllComments(req,res) {
    commentModel.findAllComments()
        .then(function (comments) {
            //console.log(comments +"comments are");
            res.send(comments);
        })
}

function findCommentsForMovie(req,res) {
    var movieId = req.params.movieId;
    commentModel.findCommentsFormovie(movieId)
        .then(function (comments) {
            if(comments){
                res.send(comments);
            }
            else {
                res.sendStatus(404).send("No comments found for the Movie!!")
            }

        })
}

function deleteComment(req,res) {
    var movieId = req.params.movieId;
    var commentId = req.params.commentId;
    commentModel.deleteComment(movieId,commentId)
        .then(function (status) {
            res.send(status);
        })
}