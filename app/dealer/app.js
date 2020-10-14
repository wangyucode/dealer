var RouteConfig = /** @class */ (function () {
    function RouteConfig($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({ redirectTo: '/undercover' });
    }
    return RouteConfig;
}());
// Declare app level module which depends on views, and core components
angular.module('dealer', [
    'ngRoute',
    'dealer.undercover'
]).config(RouteConfig);
