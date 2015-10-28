'use strict';

angular.module('pokemonsRoutesModule', [
  'ngRoute',
  'pokemonsModule'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/modules/views/list.html',
        controller: 'ListPokemonsController'
      })
      .when('/pokemon/:id', {
        templateUrl: 'app/modules/views/show.html',
        controller: 'GetPokemonController'
      });

    $locationProvider.html5Mode(true);
  });
