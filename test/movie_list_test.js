describe('Movie list', function(){
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
	      controller = $controller('MovieController', {
	        $scope: scope,
	        FirebaseService: FirebaseServiceMock
	      });
	    });
  	});

  	/*
  	* Testaa alla esitettyjä toimintoja kontrollerissasi
  	*/

  	/*
  	* Testaa, että Firebasesta (mockilta) saadut elokuvat löytyvät konrollerista
  	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
  	*/ 
	it('should list all movies from the Firebase', function() {
                expect(FirebaseServiceMock.getMovies().length).toBe(3);
		expect(FirebaseServiceMock.getMovies).toHaveBeenCalled();
	});

	/* 
	* Testaa, että elokuvan pystyy poistamaan Firebasesta.
	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
	*/
	it('should be able to remove a movie', function() {
                expect(FirebaseServiceMock.getMovies().length).toBe(3);
                FirebaseServiceMock.removeMovie(1);
                expect(FirebaseServiceMock.getMovies().length).toBe(2);
		expect(FirebaseServiceMock.removeMovie).toHaveBeenCalled();
	});
});