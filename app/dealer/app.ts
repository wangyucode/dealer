'use strict';

class RouteConfig {

  static $inject = ['$locationProvider', '$routeProvider'];

  constructor($locationProvider: angular.ILocationProvider, $routeProvider: any) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({ redirectTo: '/undercover' });
  }
}

// Declare app level module which depends on views, and core components
angular.module('dealer', [
  'ngRoute',
  'dealer.undercover'
]).config(RouteConfig);
