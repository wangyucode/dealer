'use strict';

angular.module("dealer.main", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'main/main.html',
            controller: 'MainCtrl'
        });
    }])
    .controller('MainCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.createRoom = function () {
            $location.path('/view2');
        }
    }]);