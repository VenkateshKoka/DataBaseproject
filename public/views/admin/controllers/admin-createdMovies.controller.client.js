/**
 * Created by venkateshkoka on 12/7/17.
 */

(function () {
    angular
        .module('pocApp')
        .controller('adminCreatedMoviesController', adminCreatedMoviesController);

    function adminCreatedMoviesController($location,userService,movieService,currentUser) {

        var model = this;

        model.currentUser = currentUser;


        model.deleteCreatedMovie = deleteCreatedMovie;
        model.updateMovie = updateMovie;
        model.goBack = goBack;

        function init() {
            findallCreatedMovies();
        }
        init();
        function goBack() {
            window.history.back();
        }

        function findallCreatedMovies() {
            movieService.findallCreatedMovies()
                .then(function (movies) {
                    model.movies = movies;
                })
        }

        function deleteCreatedMovie(movieId,username) {
            movieService.deleteCreatedMovie(movieId,username)
                .then(function (status) {
                    findallCreatedMovies();
                })
        }
        function updateMovie(movieId) {
            $location.url('/admin/movie/edit/'+movieId);
        }

    }
})();