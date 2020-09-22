'use strict';

// Declare app level module which depends on views, and core components
angular.module('dealer', [
  'ngRoute',
  'dealer.main',
  'dealer.undercover',
  'dealer.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/main'});
}]);
