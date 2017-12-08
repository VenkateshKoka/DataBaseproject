(function () {
    angular
        .module('pocApp')
        .controller('followProfileController', followProfileController);

        function followProfileController($location, $routeParams,currentUser, userService) {
            var model = this;
             var secondaryusername = $routeParams['username'];
            model.currentUser = currentUser;
            var isFollowerusername = currentUser.username;

            model.follow = follow;

            model.logout = logout;
            model.unfollow = unfollow;
            model.renderAnotherUser = renderAnotherUser;




            function init() {
                renderAnotherUser(secondaryusername);



            }
            init();




            function follow(mainusername,followerusername) {
                userService.follow(mainusername,followerusername)
                    .then(function () {
                        model.message = "followed successfully!!";
                        renderAnotherUser(followerusername);
                       // isFollower(isFollowerusername,secondaryusername);
                    })
            }

            function unfollow(mainusername,followerusername) {
                userService.unfollow(mainusername,followerusername)
                    .then(function () {
                        model.message = "Unfollowed successfully!!";
                         renderAnotherUser(followerusername);
                         // isFollower(isFollowerusername,secondaryusername);
                    })
            }
            function logout() {
                userService
                    .logout()
                    .then(function () {
                        $location.url('/login');
                    })
            }

            function renderAnotherUser(username) {
                userService.findFollowUserByUsername(username)
                    .then(function (anotheruser) {
                        model.anotheruser = anotheruser;
                })
            }


        }
})();
