angular.module('MovieApp')
        .controller('MoviesController', ['$scope', 'MovieService', '$location', function($scope, MovieService, $location) {
                $scope.movies = MovieService.getMovies();
                        
                $scope.addMovie = function() {
                    var promise = MovieService.addMovie($scope.movie);
                    $scope.movie = undefined;
                    promise.then(function(ref) {
                        var newId = ref.key();
                        $location.path('/');
                        Materialize.toast('Elokuva luotu!', 4000)
                    });
                }
                
        }]);