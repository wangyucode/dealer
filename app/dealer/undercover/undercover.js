var UndercoverRouteConfig = /** @class */ (function () {
    function UndercoverRouteConfig($routeProvider) {
        $routeProvider.when('/undercover', {
            templateUrl: 'undercover/undercover.html'
        });
    }
    UndercoverRouteConfig.$inject = ['$routeProvider'];
    return UndercoverRouteConfig;
}());
angular.module('dealer.undercover', ['ngRoute', 'dealer.directive.createJoinRoom', 'dealer.services'])
    .config(UndercoverRouteConfig);
