class UndercoverRouteConfig {

    constructor($routeProvider) {
        $routeProvider.when('/undercover', {
            templateUrl: 'undercover/undercover.html'
        });
    }
}

angular.module('dealer.undercover', ['ngRoute', 'dealer.services'])
    .directive('createJoinRoom', CreateJoinRoomDirective)
    .controller('CreateJoinRoomCtrl', CreateJoinRoomController)
    .config(UndercoverRouteConfig);
