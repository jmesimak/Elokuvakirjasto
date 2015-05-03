angular.module('MovieApp')
        .service('ApiService', function ($http) {

            this.findMovies = function (keyword, year) {
                return $http.get('http://www.omdbapi.com', {
                    params: {
                        s: keyword,
                        y: year
                    }
                });
            }

        });  