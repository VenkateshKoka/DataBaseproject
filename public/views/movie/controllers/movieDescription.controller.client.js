/**
 * Created by venkateshkoka on 12/6/17.
 */

(function () {
    angular
        .module('pocApp')
        .controller('movieController',movieController);

    function movieController($routeParams,$location,movieService,userService,commentService,currentUser) {

        var model = this;
        model.currentUserId = currentUser._id;
        model.currentUser = currentUser;
        model.currentusername = currentUser.username;
        // console.log(model.currentusername);
        var movieId = $routeParams['movieId'];
        model.movieId = $routeParams['movieId'];
        var username = currentUser.username;

        model.renderMovie = renderMovie;
        model.addMovieToFavorites = addMovieToFavorites;
        model.createComment = createComment;
        model.renderComments = renderComments;
        model.goBack = goBack;
        model.deleteComment = deleteComment;
        model.isMovieLiked = isMovieLiked;

        function init() {
            renderMovie(movieId);
            renderComments(movieId);
            isMovieLiked(movieId);
        }

        init();

        function goBack() {
            window.history.back();
        }

        function isMovieLiked(movieId) {
            movieService
                .searchMoviesForUser(currentUser._id)
                .then(function (movies) {
                    if(movies){
                        for (i = 0; i < movies.length; i++) {
                            if($routeParams['movieId'] === movies[i].movieId){
                                model.isLiked = true;
                                model.notLiked = true;
                                return
                            }
                        }
                    }
                    else{
                        model.isLiked = false;
                    }
                })
        }
        function renderMovie (movieId) {
            movieService
                .searchMovieById(movieId)
                .then(function (movie) {

                    model.movie = movie;
                    console.log("model movie is "+model.movie);
                })
        }

        function addMovieToFavorites(movie,userId) {
            console.log("this comment in moviedescripController"+movie.poster_path);
            movieService
                .addMovieToFavorites(movie,userId)
                .then(function (response) {
                    model.message = "successfully added";
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