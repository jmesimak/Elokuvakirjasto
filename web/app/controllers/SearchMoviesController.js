angular.module('MovieApp')
        .controller('SearchMoviesController', ['$scope', 'ApiService', function($scope, ApiService) {
            $scope.movies = [];
    
            $scope.findMovies = function() {
                var promise = ApiService.findMovies($scope.search.name, $scope.search.release);
                promise.then(function(answer) {
                    console.log(answer);
                    $scope.movies = answer.data.Search;
                });
            }


        }]);