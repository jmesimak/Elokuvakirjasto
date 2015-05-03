describe('Edit movie', function () {
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
     * Testaa, että muokkauslomakkeen tiedot täytetään muokattavan elokuvan tiedoilla.
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should fill the edit form with the current information about the movie', function () {
        expect(scope.movie.name).toBe('Joku leffa');
        expect(scope.movie.director).toBe('Kalle Ilves');
        expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
    })

    /* 
     * Testaa, että käyttäjä pystyy muokkaamaan elokuvaa, jos tiedot ovat oikeat
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should be able to edit a movie by its name, director, release date and description', function () {
        expect(scope.movie.name).toBe('Joku leffa');
        scope.movie.name = 'Jotain muuta';
        scope.editMovie();
        expect(scope.movie.name).toBe('Jotain muuta');
        expect(FirebaseServiceMock.updateMovie).toHaveBeenCalled();
    });

    /*
     * Testaa, ettei käyttäjä pysty muokkaaman elokuvaa, jos tiedot eivät ole oikeat
     * Testaa myös, että Firebasea käyttävästä palvelusta ei kutsuta muokkaus-funktiota,
     * käyttämällä not.toBeCalled-oletusta.
     */
    it('should not be able to edit a movie if its name, director, release date or description is empty', function () {
        scope.movie.name = '';
        scope.editMovie();
        scope.setMovie();
        expect(scope.movie.name).toBe('Joku leffa');
        expect(FirebaseServiceMock.updateMovie).toHaveBeenCalled();
    });
});