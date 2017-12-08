/**
 * Created by venkateshkoka on 12/6/17.
 */

(function () {
    angular
        .module('pocApp')
        .controller('MovieListController',MovieListController);


    function MovieListController($location,$routeParams,userServicep,currentUser) {

        var model = this;

        var moviename = $routeParams['moviename'];
        model.currentUser = currentUser;
        model.searchMovie = searchMovie;
        model.searchMovieById = searchMovieById;
        model.findMoviesForUser= findMoviesForUser;
        //model.name ="koka";


        function init() {
            searchMovie(moviename);
        }
        init();

        function searchMovie(moviename) {
            userServicep
                .searchMovie(moviename)
                .then(function (results) {
                    model.movies = results;
                })
        }
        function searchMovieById(movieid) {

            $location.url('/movie/'+movieid);

        }
        function findMoviesForUser() {
            $location.url('/user/movies')
        }



    }
})();