/**
 * Created by venkateshkoka on 12/6/17.
 */
(function () {
    angular
        .module('pocApp')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;

        model.register = register;
        model.registerAsCritic = registerAsCritic;
        model.registerAsAdmin = registerAsAdmin;

        function register(username, password, password2) {

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }
            if(password !== password2 || password === null || typeof password === 'undefined') {
                model.error = "passwords must match";
                return;
            }
            userService
                .findUserByUsername(username)
                .then(function () {
                    model.error = "sorry, that username is taken";
                }, function () {
                    var newUser = {
                        username: username,
                        password: password
                    };
                    return userService
                        .register(newUser);
                })
                .then(function (user) {
                    $location.url('/profile' );
                });
        }
        function registerAsCritic(username, password, password2) {

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }
            if(password !== password2 || password === null || typeof password === 'undefined') {
                model.error = "passwords must match";
                return;
            }
            userService
                .findUserByUsername(username)
                .then(function () {
                    model.error = "sorry, that username is taken";
                }, function () {
                    var newUser = {
                        username: username,
                        password: password
                    };
                    return userService
                        .registerAsCritic(newUser);
                })
                .then(function (user) {
                    $location.url('/profile' );
                });
        }
        function registerAsAdmin(username, password, password2) {

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }
            if(password !== password2 || password === null || typeof password === 'undefined') {
                model.error = "passwords must match";
                return;
            }
            userService
                .findUserByUsername(username)
                .then(function () {
                    model.error = "sorry, that username is taken";
                }, function () {
                    var newUser = {
                        username: username,
                        password: password
                    };
                    return userService
                        .registerAsAdmin(newUser);
                })
                .then(function (user) {
                    $location.url('/profile' );
                });
        }
    }
})();
