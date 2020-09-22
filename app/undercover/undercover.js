'use strict';

angular.module('dealer.undercover', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/undercover', {
            templateUrl: 'undercover/undercover.html'
        });
        
    }]);
    
