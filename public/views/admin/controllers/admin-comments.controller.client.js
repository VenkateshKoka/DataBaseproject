/**
 * Created by venkateshkoka on 12/7/17.
 */

(function () {
    angular
        .module('pocApp')
        .controller('adminCommentsController', adminCommentsController);

    function adminCommentsController($routeParams,$location,movieService,commentService,currentUser) {
        var model = this;

        model.currentUser = currentUser;

        model.deleteComment = deleteComment;
        model.findAllComments = findAllComments;
        model.goBack = goBack;

        function init() {
            findAllComments();
        }
        init();

        function goBack() {
            window.history.back();
        }

        function findAllComments() {
            commentService
                .findAllComments()
                .then(function (comments) {
                    console.log(comments+"these are the comments")
                    model.comments = comments;
                })
        }
        function deleteComment(commentId,movieId) {
            commentService.deleteComment(commentId,movieId)
                .then(function (response) {
                    findAllComments();
                })
        }
    }


})();