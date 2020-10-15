import * as angular from "angular";
import './app.css'

export default class RouteConfig {
    constructor($locationProvider: angular.ILocationProvider, $routeProvider: angular.route.IRouteProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({redirectTo: '/undercover'});
    }
}
