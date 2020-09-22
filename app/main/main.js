'use strict';

angular.module("dealer.main", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'main/main.html',
        });
    }]);
