describe('Show movie', function () {
    var controller, scope;

    var FirebaseServiceMock, RouteParamsMock;

    beforeEach(function () {
        // Lisää moduulisi nimi tähän
        module('MovieApp');

        Materialize = {toast: function () {
            }};

        RouteParamsMock = (function () {
            return {
                id: 'abc123'
            }
        })();

        FirebaseServiceMock = (function () {
            return {
                getMovies: function () {
                    return movies;
                },
                addMovie: function (movie) {
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
                    movies.push(movie);
                },
                removeMovie: function (id) {
                    movies = movies.filter(function (movie) {
                        return (movie.id !== id);
                    });
                },
                getMovie: function (id, done) {
                    if (id === 'abc123') {
                        done({
                            name: 'Joku leffa',
                            director: 'Kalle Ilves',
                            release: 2015,
                            description: 'Mahtava leffa!'
                        });
                    } else {
                        done(null);
                    }
                },
                updateMovie: function (movie) {
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
                    scope.movie = movie;
                }
            }
        })();


        spyOn(FirebaseServiceMock, 'addMovie').and.callThrough();
        spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();
        spyOn(FirebaseServiceMock, 'removeMovie').and.callThrough();
        spyOn(FirebaseServiceMock, 'getMovie').and.callThrough();
        spyOn(FirebaseServiceMock, 'updateMovie').and.callThrough();

        // Lisää vakoilijat
        // spyOn(FirebaseServiceMock, 'jokuFunktio').and.callThrough();

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('MovieController', {
                $scope: scope,
                MovieService: FirebaseServiceMock,
                $routeParams: RouteParamsMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /* 
     * Testaa, että Firebasesta (mockilta) saatu elokuva löytyy kontrollerista.
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota
     * käyttämällä toBeCalled-oletusta.
     */
    it('should show current movie from Firebase', function () {
        expect(scope.movie.name).toBe('Joku leffa');
        expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
    });
});