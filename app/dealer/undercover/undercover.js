'use strict';

angular.module('dealer.undercover', ['ngRoute', 'dealer.directive.createJoinRoom', 'dealer.services'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/undercover', {
            templateUrl: 'undercover/undercover.html'
        });

    }]);

