class UndercoverRouteConfig {

    static $inject = ['$routeProvider'];

    constructor($routeProvider) {
        $routeProvider.when('/undercover', {
            templateUrl: 'undercover/undercover.html'
        });
    }
}

angular.module('dealer.undercover', ['ngRoute', 'dealer.directive.createJoinRoom', 'dealer.services'])
    .config(UndercoverRouteConfig);

