'use strict';

angular.module('pokemonsModule', [
  'pokemonsServicesModule',
  'commentsModule'
  ])
  .controller('ListPokemonsController', ListPokemonsController)
  .controller('GetPokemonController', GetPokemonController);

// LIST POKEMONS
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

// GET POKEMON
function GetPokemonController($http, $scope, $routeParams, PokemonService) {
  PokemonService
    .findOne()
      .success(function(data) {
        console.log('SUCESSO: ', data);

        // Image
        $scope.image = 'http://pokeapi.co/media/img/' + $routeParams.id + '.png';

        // Data
        $scope.pokemon = data;

        // Description
        var descriptionUrl = 'http://pokeapi.co/' + data.descriptions[0].resource_uri;

        $http.get(descriptionUrl)
          .success(function(response){
            $scope.description = response.description;
          });

        // Evolution
        var evolutionUri = data.evolutions[0].resource_uri,
            evolutionUrl = evolutionUri.slice(0, -1);

        $scope.evolutionId = evolutionUrl.split('/').pop();
      })
      .error(function(err) {
        console.log('ERRO: ', err);
      });
}

ListPokemonsController.$inject = ['$scope', '$http', '$q', 'PokemonService'];
GetPokemonController.$inject = ['$http', '$scope', '$routeParams', 'PokemonService'];
