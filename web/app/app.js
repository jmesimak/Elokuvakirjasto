var MovieApp = angular.module('MovieApp', ['ngRoute', 'firebase']);

MovieApp.config(function($routeProvider, $httpProvider) {
    
    delete $httpProvider.defaults.headers.common["X-Requested-With"]
    
    $routeProvider
            .when('/', {
                controller: 'MoviesController',
                templateUrl: 'app/views/movies.html'
            })
            .when('/movies/new', {
                controller: 'MoviesController',
                templateUrl: 'app/views/add-movie.html'
            })
            .when('/movies/:id', {
                controller: 'MovieController',
                templateUrl: 'app/views/movie.html'
            })
            .when('/movies/:id/edit', {
                controller: 'MovieController',
                templateUrl: 'app/views/edit-movie.html'
            })
            .when('/movies', {
                controller: 'SearchMoviesController',
                templateUrl: 'app/views/find-movies.html'
            })
            .otherwise({
                redirectTo: '/'
            });
});


