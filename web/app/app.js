var MovieApp = angular.module('MovieApp', ['ngRoute', 'firebase']);

MovieApp.config(function($routeProvider) {
    
    $routeProvider
            .when('/', {
                controller: 'MovieController',
                templateUrl: 'app/views/movies.html'
            })
            .when('/movies/new', {
                controller: 'MovieController',
                templateUrl: 'app/views/add-movie.html'
            })
            .otherwise({
                redirectTo: '/'
            });
});


