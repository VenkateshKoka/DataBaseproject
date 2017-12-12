/**
 * Created by venkateshkoka on 12/2/17.
 */
(function () {
    angular
        .module('pocApp',['ngRoute', 'textAngular'])   // 'ngRoute', "textAngular"
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: './main.html',
                controller: 'mainController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkCurrentUser
                }
            })

            .when('/search/:moviename', {
                templateUrl: './searchMovieResults.html',
                controller: 'MovieListController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkCurrentUser
                }
            })
            .when('/movie/:movieId', {
                templateUrl: './views/movie/templates/movieDescription.view.client.html',
                controller: 'movieController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkCurrentUser
                }
            })
            .when('/movie/edit/:movieId', {
                templateUrl: './views/movie/templates/movieEdit.view.client.html',
                controller: 'movieEditController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkLoggedIn
                }
            })
            .when('/login', {
                templateUrl: './views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: './views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkLoggedIn
                }
            })
            .when('/register', {
                templateUrl: './views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/user/movielist', {
                templateUrl: './views/movie/templates/movielistFavorite.view.client.html',
                controller: 'favoriteMovieController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkLoggedIn
                }
            })
            .when('/user/favoriteMovie/:movieId', {
                templateUrl: './views/movie/templates/movieFavoriteDescription.view.client.html',
                controller: 'movieFavoriteController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkLoggedIn
                }
            })
            .when('/critic/movie', {
                templateUrl: './views/movie/templates/createdMoviesList.view.client.html',
                controller: 'createdMovieListController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkLoggedIn
                }
            })
            .when('/critic/movie/new', {
                templateUrl: './views/movie/templates/newMovie.view.client.html',
                controller: 'newMovieController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkLoggedIn
                }
            })
            .when('/user/follow/:username', {
                templateUrl: './views/user/templates/followProfile.view.client.html',
                controller: 'followProfileController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkLoggedIn
                }
            })
            .when('/admin', {
                templateUrl: 'views/admin/templates/admin-view.client.html',
                resolve :{
                    currentUser : checkAdmin
                }
            })
            .when('/admin/user', {
                templateUrl: 'views/admin/templates/admin-users.view.client.html',
                controller: 'adminUsersController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkAdmin
                }
            })
            .when('/admin/comments', {
                templateUrl: 'views/admin/templates/admin-comments.view.client.html',
                controller: 'adminCommentsController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkAdmin
                }
            })
            .when('/admin/createdMovies', {
                templateUrl: 'views/admin/templates/admin-createdMovies.view.client.html',
                controller: 'adminCreatedMoviesController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkAdmin
                }
            })
            .when('/admin/movie/edit/:movieId', {
                templateUrl: 'views/admin/templates/admin-movieEdit.view.client.html',
                controller: 'adminMovieEditController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkAdmin
                }
            })



    }
    function checkLoggedIn(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                //console.log(user);
                if(user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkAdmin(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .checkAdmin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkCurrentUser(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }
})();