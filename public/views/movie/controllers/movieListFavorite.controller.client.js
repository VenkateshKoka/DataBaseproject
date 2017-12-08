/**
 * Created by venkateshkoka on 12/7/17.
 */

(function () {
    angular
        .module('pocApp')
        .controller('favoriteMovieController', favoriteMovieController);

    function favoriteMovieController($routeParams,$location,movieService,currentUser) {

        var model = this;
        model.currentUserId = currentUser._id;

        model.renderMovies = renderMovies;
        model.searchFavoriteMovieById = searchFavoriteMovieById;
        model.deleteFavoriteMovie = deleteFavoriteMovie;
        model.addMovieToFavorites = addMovieToFavorites;

        function init() {
            renderMovies();
        }

        init();

        function renderMovies () {
            movieService
                .searchMoviesForUser(currentUser._id)
                .then(function (movies) {
                    model.movies = movies;
                })
        }

        function addMovieToFavorites(movie,userId) {

            movieService
                .addMovieToFavorites(movie,userId)
                .then(function (response) {
                    model.message = "successfully added";
                })

        }
        function searchFavoriteMovieById(movieId) {
            movieService
                .searchFavoriteMovieById(movieId)
                .then(function (response) {
                    $location.url('/user/favoriteMovie/'+movieId);
                })
        }

        function deleteFavoriteMovie(movieId) {
            movieService
                .deleteFavoriteMovie(movieId,currentUser._id)
                .then(function (response) {
                    init();
                })
        }
    }

})();