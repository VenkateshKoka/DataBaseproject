/**
 * Created by venkateshkoka on 12/7/17.
 */

(function () {
    angular
        .module('pocApp')
        .controller('createdMovieListController', createdMovieListController);

    function createdMovieListController($routeParams,$location,movieService,commentService,currentUser) {

        var model = this;
        model.currentUserId = currentUser._id;
        model.currentusername = currentUser.username;
        var username = currentUser.username;


        model.editCreatedMovie = editCreatedMovie;
        model.deleteCreatedMovie = deleteCreatedMovie;


        function init() {
            movieService.searchCreatedMoviesForUser(username)
                .then(function (movies) {
                    model.movies = movies;
                })
        }
        init();

        function editCreatedMovie(movieId) {
            $location.url('/movie/edit/'+movieId);
        }
        function deleteCreatedMovie(movieId,username) {
            movieService.deleteCreatedMovie(movieId,username)
                .then(function (status) {
                    init();
                })
        }


    }
})();