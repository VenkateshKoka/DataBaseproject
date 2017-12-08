/**
 * Created by venkateshkoka on 12/7/17.
 */


(function () {
    angular
        .module('pocApp')
        .factory('movieService', movieService);

    function movieService($http) {

        var api_key = "733301f8bd6ddaa408b856326dbf8fd4";
        var baseurl = "https://api.themoviedb.org/3/search/movie?api_key="+api_key+"&query=";

        var api = {
            addMovieToFavorites : addMovieToFavorites,
            searchMovieById : searchMovieById,
            searchMoviesForUser : searchMoviesForUser,
            searchFavoriteMovieById: searchFavoriteMovieById,
            deleteFavoriteMovie : deleteFavoriteMovie,
            searchCreatedMoviesForUser: searchCreatedMoviesForUser,
            createNewMovie : createNewMovie,
            findallCreatedMovies : findallCreatedMovies,
            deleteCreatedMovie:deleteCreatedMovie,
            searchMoviesForUsername:searchMoviesForUsername,
            searchCreatedMovieById:searchCreatedMovieById,
            updateMovie:updateMovie

        }

        return api;

        function updateMovie(movieId,movie) {
            var url = '/api/update/movie/'+movieId;
            return $http.put(url,movie)
                .then(function (response) {
                    return response.data;
                })
        }

        function searchMoviesForUsername(username) {
            var url = '/api/username/'+username+'/movie';
            return $http.get(url).then(function (response) {
                return response.data;
            })
        }

        function deleteCreatedMovie(movieId,username) {
            var url = '/api/createdMovie/delete/'+movieId+'/by/'+username;
            return $http.delete(url).then(function (response) {
                return response.data;
            })
        }


        function createNewMovie(username,movie) {
            var url = "/api/user/"+username+"/critic/movie/new";
            return $http.post(url,movie)
                .then(function (response) {
                    return response.data;
                })

        }

        function findallCreatedMovies() {
            var url = "/api/admin/allmovies";
            return $http.get(url).then(function (response) {
                return response.data;
            })
        }

        function searchCreatedMoviesForUser(username) {
            var url = '/api/movie/'+username+'/createdMovies';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function searchMoviesForUser(userId) {
            var url = '/api/project/user/'+userId+'/movie';
            return $http.get(url).then(function (response) {
                return response.data;
            })

        }

        function addMovieToFavorites(movieObj,userId) {
            var url = '/api/project/user/'+userId+'/movie';
            return $http
                .post(url,movieObj)
                .then(function (response) {
                    return response.data;
                })

        }

        function  searchMovieById(movieId) {
            var url = "https://api.themoviedb.org/3/movie/"+movieId+"?api_key="+api_key;
            return $http.get(url).then(function (response) {
                return response.data;
            })

        }
        function searchCreatedMovieById(movieId) {
            var url = '/api/createdMovie/edit/'+movieId;
            return $http.get(url).then(function (response) {
                return response.data;
            })
        }

        function searchFavoriteMovieById(movieId) {
            var url = "/api/project/user/favoriteMovie/"+movieId;
            return $http.get(url).then(function (response) {
                return response.data;
            })
        }

        function deleteFavoriteMovie(movieId,userId) {
            var url = "/api/project/user/"+userId+"/movie/"+movieId;
            return $http
                .delete(url,userId)
                .then(function (response) {
                    return response.data;
                })
        }


    }

})();
