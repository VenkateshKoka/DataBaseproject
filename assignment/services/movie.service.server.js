/**
 * Created by venkateshkoka on 12/7/17.
 */

var app = require('../../express');



app.post('/api/project/user/:userId/movie',addMovieToFavorites);
app.get('/api/project/user/:userId/movie',searchMoviesForUser);
app.get('/api/project/user/favoriteMovie/:movieId',searchFavoriteMovieById)
app.delete('/api/project/user/:userId/movie/:movieId',deleteFavoriteMovie);
app.get('/api/movie/:username/createdMovies',searchCreatedMoviesForUser);
app.post('/api/user/:username/critic/movie/new',createNewMovie);
app.get("/api/admin/allmovies",findallCreatedMovies);
app.delete('/api/createdMovie/delete/:movieId/by/:username',deleteCreatedMovie);
app.get('/api/username/:username/movie',searchMoviesForUsername);
app.get('/api/createdMovie/edit/:movieId',searchCreatedMovieById);
app.put('/api/update/movie/:movieId',updateMovie);

var movieModel = require('../models/movie/movie.model.server');


function updateMovie(req,res) {
    var movieId = req.params.movieId;
    var movie = req.body;
    movieModel.updateMovie(movieId,movie)
        .then(function (status) {
            res.send(status);
        })
}

function searchCreatedMovieById(req,res) {
    var movieId = req.params.movieId;
    movieModel.searchCreatedMovieById(movieId).then(function (movie) {
        res.send(movie);
    })
}

function searchMoviesForUsername(req,res) {
    var username = req.params.username;
    movieModel
        .searchMoviesForUsername(username)
        .then(function (movies) {
            res.send(movies);
        });

}

function deleteCreatedMovie(req,res) {
    var movieId = req.params.movieId;
    var username = req.params.username;
    movieModel.deleteCreatedMovie(movieId,username).then(function (status) {
        res.send(status);
    })
}

function createNewMovie(req,res) {
    var movie = req.body;
    var username = req.params.username;
    movieModel.createNewMovie(username,movie)
        .then(function (movie) {
            res.send(movie);
        })
}

function findallCreatedMovies(req,res) {
    movieModel.findallCreatedMovies()
        .then(function (movies) {
            res.send(movies);
        })
}

function searchCreatedMoviesForUser(req,res) {
    var username = req.params.username;
    movieModel.searchCreatedMoviesForUser(username)
        .then(function (movies) {
            res.send(movies);
        })
}


function addMovieToFavorites(req,res) {
    var movie = req.body;
    movieModel
        .addMovieToFavorites(req.params.userId,movie)
        .then(function (movie) {
            res.send(movie);
        })

}

function searchMoviesForUser(req,res) {
    var userId = req.params.userId;
    movieModel
        .searchMoviesForUser(userId)
        .then(function (movies) {
            res.send(movies);
        });
}

function searchFavoriteMovieById(req,res) {
    var movieId = req.params.movieId;
    movieModel
        .searchFavoriteMovieById(movieId)
        .then(function (movie) {
            res.send(movie);
        })
}

function deleteFavoriteMovie(req,res) {
    var movieId = req.params.movieId;
    var userId = req.params.userId;
    movieModel
        .deleteFavoriteMovie(userId,movieId)
        .then(function (status) {
            res.send(status);
        })
}


