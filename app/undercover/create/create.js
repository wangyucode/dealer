'use strict';

angular.module('dealer.undercover')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/undercover/create', {
            templateUrl: 'undercover/create/create.html',
            controller: 'UndercoverCreateCtrl'
        });
    }])
    .controller('UndercoverCreateCtrl', ['$scope', '$location', 'stompClient', function ($scope, $location, stompClient) {
        $scope.civilian = 3;
        $scope.undercover = 1;
        $scope.total = 4;
        $scope.blank = 0;
        $scope.hasBlank = false;

        $scope.change = function () {
            console.log("change")
            if ($scope.total < 6) {
                $scope.undercover = 1;
                $scope.blank = $scope.hasBlank ? 1 : 0;
            } else if ($scope.total < 9) {
                $scope.undercover = 2;
                $scope.blank = $scope.hasBlank ? 1 : 0;
            } else if ($scope.total < 12) {
                $scope.undercover = 2;
                $scope.blank = $scope.hasBlank ? 2 : 0;
            } else if ($scope.total < 15) {
                $scope.undercover = 3;
                $scope.blank = $scope.hasBlank ? 2 : 0;
            } else if ($scope.total < 18) {
                $scope.undercover = 4;
                $scope.blank = $scope.hasBlank ? 3 : 0;
            } else {
                $scope.undercover = 5;
                $scope.blank = $scope.hasBlank ? 3 : 0;
            }
            $scope.civilian = $scope.total - $scope.undercover - $scope.blank;
        };

        function connectCallback() {
            console.log(456);
            $location.path("/undercover/play").search({ "host": 1 });
        }

        function errorCallback(error) {
            console.log(error)
        }

        $scope.create = function () {
            console.log("stompClient->", stompClient)
            stompClient.onConnect = function (frame) {
                // Do something, all subscribes must be done is this callback
                // This is needed because this will be executed after a (re)connect
                $location.path("/undercover/play").search({ "host": 1 });
                console.log(frame);

                
                $scope.$apply();
            };

            stompClient.onStompError = function (frame) {
                // Will be invoked in case of error encountered at Broker
                // Bad login/passcode typically will cause an error
                // Complaint brokers will set `message` header with a brief message. Body may contain details.
                // Compliant brokers will terminate the connection after any error
                console.log('Broker reported error: ' + frame.headers['message']);
                console.log('Additional details: ' + frame.body);
            };
            stompClient.activate();
        }


    }]);