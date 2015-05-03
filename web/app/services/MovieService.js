angular.module('MovieApp')
        .service('MovieService', function($firebase, $q ) {
            var firebaseRef = new Firebase('https://movieharveli.firebaseio.com/movies');
            var sync = $firebase(firebaseRef);
            var movies = sync.$asArray();

            this.getMovies = function(){
                return movies;
            }
            
            this.addMovie = function(movie) {
                var empty = false;
                for (var key in movie) {
                    if (movie.hasOwnProperty(key)) {
                        if (!movie[key]) {
                            empty = true;
                        }
                    }
                }
                if (empty) {
                    return false;
                }
                return movies.$add(movie);//.then(function(data) {
            }
            
            this.removeMovie = function(movie) {
                return movies.$remove(movie);
            }
        });  