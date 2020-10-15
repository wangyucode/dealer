export default class UndercoverRouteConfig {

    constructor($routeProvider) {
        $routeProvider.when('/undercover', {
            templateUrl: 'undercover/undercover.html'
        });
    }
}
