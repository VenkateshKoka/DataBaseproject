/**
 * Created by venkateshkoka on 12/6/17.
 */


var mongoose = require('mongoose');
var movieSchema = require('./movie.schema.server');
var movieModel = mongoose.model('ProjectMovieModel', movieSchema);
var userModel =require('../user/user.model.server');



movieModel.addMovieToFavorites = addMovieToFavorites;
movieModel.searchMoviesForUser = searchMoviesForUser;
movieModel.searchFavoriteMovieById = searchFavoriteMovieById;
movieModel.deleteFavoriteMovie = deleteFavoriteMovie;
movieModel.searchCreatedMoviesForUser = searchCreatedMoviesForUser;
movieModel.createNewMovie = createNewMovie;
movieModel.findallCreatedMovies = findallCreatedMovies;
movieModel.deleteCreatedMovie = deleteCreatedMovie;
movieModel.searchMoviesForUsername = searchMoviesForUsername;
movieModel.searchCreatedMovieById = searchCreatedMovieById;
movieModel.updateMovie = updateMovie;


module.exports = movieModel;




function updateMovie(movieId,movie) {

    return movieModel.update({_id: movieId}, {$set: movie});

}

function searchCreatedMovieById(movieId) {
    return movieModel.findOne({_id:movieId});
}
function searchMoviesForUsername(username) {
    return movieModel.find({_createdUser:username});
}

function deleteCreatedMovie(movieId,username) {
    return movieModel.remove({_id:movieId});
}


function createNewMovie(username,movie) {
    movie._createdUser = username;
    var imageurl = "https://images-na.ssl-images-amazon.com/images/M/MV5BOTUwODM5MTctZjczMi00OTk4LTg3NWUtNmVhMTAzNTNjYjcyXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg"
    //var imageurl = "https://lh3.googleusercontent.com/2teHUYh2fCPxCMhMJp_uU5tCbPJhxQSf0fEqX3Sv54tHmRHH9Z7nwvjub2krD-OcDXbHzuC1kTXscgvLqnzwQA=s360";
    movie.imageURL = imageurl;
    movie.overview = movie.overview;
    return movieModel.create(movie);

}

function findallCreatedMovies() {
    return movieModel.find({_createdUser:{$exists:true}});
}

function searchCreatedMoviesForUser(username) {
    return movieModel.find({_createdUser:username});
}

function addMovieToFavorites(userId, movie) {
    movie._user = userId;
    movie.movieId = movie.id;
    var url = "http://image.tmdb.org/t/p/w300/";
    movie.imageURL = url+movie.poster_path;
    console.log(url+movie.poster_path);
    return movieModel
        .create(movie)
        .then(function (movie) {
            return userModel
                .addMovieToFavorites(userId,movie._id);
        })
}

function searchMoviesForUser(userId) {
    return movieModel
        .find({_user: userId})
        .populate('_user')
        .exec();
}

function searchFavoriteMovieById(movieId) {
    return movieModel
        .findOne({movieId : movieId});
}


function deleteFavoriteMovie(userId, movieId) {
    return movieModel
        .remove({_id: movieId})
        .then(function (status) {
            return userModel
                .deleteFavoriteMovie(userId, movieId);
        });
}



