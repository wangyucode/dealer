'use strict';

angular.module('dealer.undercover')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/undercover/play', {
            templateUrl: 'undercover/play/play.html',
            controller: 'UndercoverPlayCtrl'
        });

    }])
    .controller('UndercoverPlayCtrl', ['$scope', '$location', 'serverURL','initData', function ($scope, $location, serverURL,initData) {
        $scope.showRole = false;
        $scope.roomId = initData.roomId;
        console.log(initData)
    }]);