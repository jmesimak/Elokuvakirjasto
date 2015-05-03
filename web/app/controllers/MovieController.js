angular.module('MovieApp')
        .controller('MovieController', ['$scope', 'MovieService', '$location', '$routeParams', function($scope, MovieService, $location, $routeParams) {
                $scope.setMovie = function() {
                    MovieService.getMovie($routeParams.id, function(data) {
                        $scope.movie = data;
                    });
                }
                
                $scope.deleteMovie = function() {
                    if ($scope.movie && window.confirm("Poistetaanko varmasti?")) {
                        MovieService.removeMovie($scope.movie);
                        $location.path('/');
                        Materialize.toast('Elokuva poistettu', 4000)
                    }
                };
                
                $scope.editMovie = function() {
                    MovieService.updateMovie($scope.movie);
                    $location.path('/movies/'+$scope.movie.$id);
                    Materialize.toast('Elokuvan tietoja muokattu', 4000)
                }
                
                $scope.setMovie();
                
        }]);