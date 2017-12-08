/**
 * Created by venkateshkoka on 12/7/17.
 */

(function () {
    angular
        .module('pocApp')
        .controller('newMovieController', newMovieController);

    function newMovieController($routeParams,$location,movieService,commentService,currentUser) {
        var model = this;
        model.currentUserId = currentUser._id;
        model.currentusername = currentUser.username;

        var username = currentUser.username;
        model.createNewMovie=createNewMovie;

        function createNewMovie(movie) {
            if(!(movie.name ==='' || movie.overview==='')){
                var username = currentUser.username;

                movieService.createNewMovie(username,movie)
                    .then(function (response) {
                        $location.url('/critic/movie');
                    })
            }
        }
    }

})();