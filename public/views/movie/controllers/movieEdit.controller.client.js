/**
 * Created by venkateshkoka on 12/7/17.
 */

(function () {
    angular
        .module('pocApp')
        .controller('movieEditController', movieEditController);

    function movieEditController($routeParams,$location,movieService,commentService,currentUser) {
        var model = this;
        model.currentUserId = currentUser._id;
        model.currentusername = currentUser.username;

        model.updateMovie = updateMovie;
        var movieId = $routeParams['movieId'];

        function init() {
            movieService.searchCreatedMovieById(movieId)
                .then(function(movie) {
                    model.movie = movie;
                })
        }
        init();
        function updateMovie(movieId,movie) {
            movieService
                .updateMovie(movieId,movie)
                .then(function () {
                    $location.url('/critic/movie');
                })
        }

    }
})();