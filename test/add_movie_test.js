describe('Add movie', function(){
	var controller, scope;

	var FirebaseServiceMock;

  	beforeEach(function(){
  		// Lisää moduulisi nimi tähän
    	module('MovieApp');

    	FirebaseServiceMock = (function(){
                        var movies = [{
                                    id: 1,
                                    name: 'James Bond',
                                    director: 'Bob',
                                    release: 1995,
                                    description: 'Man shoots people and is bad ass.'
                                }, {
                                    id: 2,
                                    name: 'Monsters',
                                    director: 'Jack',
                                    release: 1999,
                                    description: 'Is a nice man, not afraid of monsters.'
                                }, {
                                    id: 3,
                                    name: 'Pedro',
                                    director: 'Pedro',
                                    release: 2005,
                                    description: 'Is about Pedro, the director.'
                                }];
            
			return {
                            getMovies: function() {
                                return movies;
                            },
                            addMovie: function(movie) {
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
                            removeMovie: function(id) {
                                movies = movies.filter(function(movie) {
                                    return (movie.id !== id);
                                });
                            }
				// Toteuta FirebaseServicen mockatut metodit tähän
			}
		})();

                spyOn(FirebaseServiceMock, 'addMovie').and.callThrough();
                spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();
                spyOn(FirebaseServiceMock, 'removeMovie').and.callThrough();
		// Lisää vakoilijat
	    // spyOn(FirebaseServiceMock, 'jokuFunktio').and.callThrough();

    	// Injektoi toteuttamasi kontrolleri tähän
	    inject(function($controller, $rootScope) {
	      scope = $rootScope.$new();
	      // Muista vaihtaa oikea kontrollerin nimi!
	      controller = $controller('MoviesController', {
	        $scope: scope,
	        FirebaseService: FirebaseServiceMock
	      });
	    });
  	});

  	/*
  	* Testaa alla esitettyjä toimintoja kontrollerissasi
  	*/

  	/*
  	* Testaa, että käyttäjä pystyy lisäämään elokuvan oikeilla tiedoilla.
  	* Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
  	* on kutsutta oikeaa funktiota lisäämällä siihen vakoilijan ja käyttämällä
  	* toBeCalled-oletusta.
	*/
	it('should be able to add a movie by its name, director, release date and description', function(){
                var m = {
                    name: 'Maven',
                    director: 'Hector',
                    release: 2002,
                    description: 'Not a good movie, avoid watching'
                };
                FirebaseServiceMock.addMovie(m);
                expect(FirebaseServiceMock.addMovie).toHaveBeenCalled();
		expect(FirebaseServiceMock.getMovies().length).toBe(4);
	});

	/*	
	* Testaa, ettei käyttäjä pysty lisäämään elokuvaa väärillä tiedoilla.
	* Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
	* EI kutsuta funktiota, joka hoitaa muokkauksen. Voit käyttää siihen
	* not.toBeCalled-oletusta (muista not-negaatio!).
	*/
	it('should not be able to add a movie if its name, director, release date or description is empty', function() {
                var m = {
                    name: 'Jack',
                    director: '',
                    release: 2002,
                    description: ''
                };
                FirebaseServiceMock.addMovie(m);
                expect(FirebaseServiceMock.getMovies().length).toBe(3);
	});
});