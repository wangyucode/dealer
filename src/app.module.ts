import * as angular from 'angular'
import './app.css'

class RouteConfig {

    constructor($locationProvider: angular.ILocationProvider, $routeProvider: angular.route.IRouteProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({redirectTo: '/undercover'});
    }
}

// Declare app level module which depends on views, and core components
angular.module('dealer', [
    'ngRoute',
    'dealer.undercover'
]).config(RouteConfig);
