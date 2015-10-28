'use strict';

function PokemonService($http, $routeParams){
  var apiURL = 'http://pokeapi.co/api/v1/';

  this.findAll = function(){
    return $http.get(apiURL + 'pokedex/1/');
  };

  this.findOne = function(){
    return $http.get(apiURL + 'pokemon/' + $routeParams.id);
  };
}

PokemonService.$inject = ['$http', '$routeParams'];

angular.module('pokemonsServicesModule', [])
  .service('PokemonService', PokemonService);
