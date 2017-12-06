/**
 * Created by venkateshkoka on 12/6/17.
 */

(function () {
    angular
        .module('pocApp')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = login;

        function login(username,password) {
            if( !username || !password){
                if(!username)
                    model.errorMessage = "Username and Password cannot be empty";
                else if(password){
                    if(!password)
                        model.errorMessage = "Username and Password cannot be empty";
                    else
                        model.errorMessage = "Username cannot be empty";
                }
                else{
                    if(!username)
                        model.errorMessage = "Username and Password cannot be empty";
                    else
                        model.errorMessage = "Password cannot be empty";
                }
            }
            else{
                userService
                    .login(username,password)
                    .then(
                        function successCallback(response) {
                            $location.url("/profile");
                        },
                        function errorCallback(response) {
                            model.errorMessage = "Entered Credentials are Invalid";
                        }
                    );
            }

        // function login(username, password) {
        //     // var found = userService.findUserByCredentials(username, password);
        //     userService
        //         .login(username, password) // changed from findUserByCredentials to login
        //         .then(loginuser,loginError);
        //
        //     function loginuser(user) {
        //         if(user === null) {
        //             model.message = "sorry, invalid credentials. please try again!";
        //         } else {
        //             $location.url('/profile');
        //         }
        //     }
        //
        //
        //
        //     function loginError(user) {
        //         model.message = "Invalid credentials !!"
        //
        //     }


        }
    }
})();