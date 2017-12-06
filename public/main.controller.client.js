/**
 * Created by venkateshkoka on 12/2/17.
 */
(function () {
    angular
        .module('pocApp')
        .controller('mainController', mainController);

    function mainController($location,$routeParams,userService,currentUser) {
        var model = this;

        model.searchrecipe =  searchrecipe;

        model.currentUser = currentUser;
        // model.logout = logout;


        function searchrecipe(recipename) {
            $location.url('/search/'+recipename);
        }


    }
})();