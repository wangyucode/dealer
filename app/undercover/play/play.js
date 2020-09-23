'use strict';

angular.module('dealer.undercover')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/undercover/play', {
            templateUrl: 'undercover/play/play.html',
            controller: 'UndercoverPlayCtrl'
        });
        
    }])
    .controller('UndercoverPlayCtrl', ['$scope','$location', function ($scope, $location) {
        $scope.showRole = false;
    }]);