/**
 * Created by venkateshkoka on 12/7/17.
 */

(function() {
    angular
        .module('pocApp')
        .factory('commentService', commentService);

    function commentService($http) {

        var api = {
            createComment : createComment,
            findCommentsForMovie: findCommentsForMovie,
            deleteComment:deleteComment,
            findAllComments:findAllComments
        }

        return api;

        function createComment(comment,movieId,username) {
            var url = '/api/project/user/'+username+'/movie/'+movieId+'/comment';
            return $http.post(url,comment)
                .then(function (response) {
                    return response.data;
                })
        }

        function findAllComments() {
            var url = '/api/all/comments';
            return $http.get(url)
                .then(function (response) {
                    // console.log(response+"response in comment client")
                    return response.data;
                })
        }

        function findCommentsForMovie(movieId) {
            var url = '/api/project/user/movie/'+movieId+'/comments';
            return $http.get(url)
                .then(function (response) {

                    return response.data;
                })
        }
        function deleteComment(commentId,movieId) {
            var url = '/api/project/user/movie/'+movieId+'/comment/'+commentId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }


    }




})();