/**
 * Created by venkateshkoka on 12/6/17.
 */

(function(){
    angular
        .module('pocApp')
        .factory('userService', userService);

    function userService($http) {

        var api = {
            createUser: createUser,
            register : register,
            registerAsCritic:registerAsCritic,
            registerAsAdmin:registerAsAdmin,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers : findAllUsers,
            login : login,
            checkAdmin : checkAdmin,
            logout : logout,
            loggedin : loggedin,
            updateUser: updateUser,
            deleteUser:deleteUser,
            unregister : unregister
        };
        return api;


        function logout() {
            var url = "/api/project/logout";
            return $http.post(url)
                .then(function (status) {
                    return status;
                });
        }

        function login(username,password) {
            var url = "/api/project/login";
            var credentials = {
                username :username,
                password : password
            }
            return $http.post(url,credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function loggedin() {
            var url = "/api/project/loggedin";
            return $http.get(url)
                .then(function (response) {
                    // console.log(response);
                    return response.data;
                })
        }

        function checkAdmin() {
            var url = "/api/project/checkAdmin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function register(userObj) {
            var url = "/api/project/register";
            return $http
                .post(url,userObj)
                .then(function (response) {
                    return response.data;
                })
        }

        function registerAsCritic(userObj) {
            var url = "/api/project/register/critic";
            return $http
                .post(url,userObj)
                .then(function (response) {
                    return response.data;
                })
        }
        function registerAsAdmin(userObj) {
            var url = "/api/project/register/admin";
            return $http
                .post(url,userObj)
                .then(function (response) {
                    return response.data;
                })
        }

        function unregister(userObj) {
            var url = "/api/project/unregister";
            return $http
                .post(url,userObj)
                .then(function (response) {
                    return response.data;
                })
        }


        function deleteUser(userId) {
            var url = "/api/project/user/"+userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            var url = "/api/project/user/"+userId;
            return $http
                .put(url,user)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {

            var url = "/api/project/user";
            return $http.post(url,user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {

            var url = "/api/project/user?username="+username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }



        function findUserById(userId) {

            var url = "/api/project/user/"+userId;
            return  $http.get(url)
                .then(function (response) {
                    var user = response.data;
                    return user;
                })
        }

        function findUserByCredentials(username, password) {
            var url = "/api/project/user?username="+username+"&password="+password;
            return $http.get(url)
                .then(function (response) {
                    console.log(response.data);
                    return response.data;
                });

        }

        function findAllUsers() {
            var url = "/api/project/user";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                })
        }

    }
})();