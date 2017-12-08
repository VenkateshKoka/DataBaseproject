/**
 * Created by venkateshkoka on 12/7/17.
 */

(function () {
    angular
        .module('pocApp')
        .controller('movieFavoriteController', movieFavoriteController);

    function movieFavoriteController($routeParams,$location,movieService,commentService,currentUser) {
        var model = this;
        model.currentUserId = currentUser._id;
        model.currentusername = currentUser.username;
        var movieId = $routeParams['movieId'];
        var username = currentUser.username;

        model.renderFavoriteMovie = renderFavoriteMovie;
        model.createComment = createComment;
        model.renderComments = renderComments;
        model.deleteComment = deleteComment;


        function init() {
            renderFavoriteMovie(movieId);
            renderComments(movieId);
        }

        init();

        function renderFavoriteMovie (movieId) {
            movieService
                .searchFavoriteMovieById(movieId)
                .then(function (movie) {

                    model.movie = movie;
                })
        }

        function createComment(comment,movieId) {
            if(comment.commentBody){
                commentService
                    .createComment(comment,movieId, currentUser.username)
                    .then(function (response) {
                        model.message = "thanks for your feedback";
                        renderComments(movieId);

                    })
            }
            else{
                model.message = "cannot post empty comment";
            }

        }

        function renderComments(movieId) {
            console.log(movieId+"the movie **************");
            commentService
                .findCommentsForMovie(movieId)
                .then(function (comments) {
                    model.comments = comments;
                })
        }
        function deleteComment(commentId) {
            commentService.deleteComment(commentId,movieId)
                .then(function (response) {
                    renderComments(movieId);
                })
        }




    }

})();