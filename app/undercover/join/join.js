'use strict';

angular.module('dealer.undercover')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/undercover/join', {
            templateUrl: 'undercover/join/join.html',
            controller: 'UndercoverJoinCtrl'
        });
    }])
    .controller('UndercoverJoinCtrl', ['$scope', function ($scope) {
        $scope.roomId = ""

        $scope.join = function () {
            console.log("join");
        }
    }]);