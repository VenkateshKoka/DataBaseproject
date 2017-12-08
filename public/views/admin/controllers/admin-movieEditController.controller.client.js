/**
 * Created by venkateshkoka on 12/7/17.
 */

(function () {
    angular
        .module('pocApp')
        .controller('adminMovieEditController', adminMovieEditController);

    function adminMovieEditController($routeParams,$location,userService,movieService,currentUser) {

        var model = this;

        model.currentUser = currentUser;
        model.currentusername = currentUser.username;
        var movieId = $routeParams['movieId'];

        model.updateMovie = updateMovie;

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
                    $location.url('/admin/createdMovies');
                })
        }
    }
})();
