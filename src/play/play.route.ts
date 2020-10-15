import './play.html'

export default class UndercoverPlayRouteConfig {

    constructor($routeProvider: angular.route.IRouteProvider) {
        $routeProvider.when('/undercover/play', {
            templateUrl: 'play/play.html',
            controller: 'UndercoverPlayCtrl'
        });
    }
}
