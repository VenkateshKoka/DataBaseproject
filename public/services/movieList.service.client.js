/**
 * Created by venkateshkoka on 12/6/17.
 */

(function(){
    angular
        .module('pocApp')
        .factory('userServicep', userServicep);

    function userServicep($http) {

        var api_key = "733301f8bd6ddaa408b856326dbf8fd4";
        var baseurl = "https://api.themoviedb.org/3/search/movie?api_key="+api_key+"&query=";

        var api = {
            searchMovie : searchMovie
        };
        return api;

        function searchMovie(moviename) {
            var search_parameters = moviename;
            var url = baseurl+search_parameters;
            return $http.get(url)
                .then(function (response) {
                    console.log(response.data.results)
                    return response.data.results;
                });
        }
    }
})();