'use strict';

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

GetPokemonController.$inject = ['$http', '$scope', '$routeParams', 'PokemonService'];

angular.module('getPokemonModule', [
  'pokemonsServicesModule',
  'commentsModule'
  ])
  .controller('GetPokemonController', GetPokemonController);
