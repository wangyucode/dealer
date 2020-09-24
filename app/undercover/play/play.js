'use strict';

angular.module('dealer.undercover')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/undercover/play', {
            templateUrl: 'undercover/play/play.html',
            controller: 'UndercoverPlayCtrl'
        });

    }])
    .controller('UndercoverPlayCtrl', ['$scope', '$location', 'stompClient', function ($scope, $location, stompClient) {
        $scope.showRole = false;

        if ($location.search().host) {
            stompClient.subscribe('/user/queue/dealer/status', function (message) {
                console.log(message);
            });
        }

        stompClient.publish({destination: '/app/dealer/status'});

    }]);