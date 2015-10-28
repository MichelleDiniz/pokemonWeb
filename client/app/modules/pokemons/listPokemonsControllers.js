'use strict';

angular.module('listPokemonsModule', [
  'pokemonsServicesModule'
  ])
  .controller('ListPokemonsController', ListPokemonsController);

function ListPokemonsController($scope, $http, $q, PokemonService) {

  function getAllPokemons(pokemons){
    var defered = $q.defer();

    PokemonService
      .findAll()
        .success(function(list){

          pokemons = list.pokemon;
          pokemons = pokemons.map(buildPokemon);
          defered.resolve(pokemons);

          $scope.pokemons = pokemons;

        })
        .error(function(){
          defered.reject([]);
        });
    return defered.promise;
  }

  function buildPokemon(pokemon){
    var pokeUri = pokemon.resource_uri.split('/');
    var id = pokeUri[pokeUri.length - 2];

    pokemon.id = parseInt(id);
    pokemon.image = 'http://pokeapi.co/media/img/' + id + '.png';

    return pokemon;
  }
  getAllPokemons();
}

ListPokemonsController.$inject = ['$scope', '$http', '$q', 'PokemonService'];
