'use strict';

angular.module('dealer.undercover')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/undercover/create', {
            templateUrl: 'undercover/create/create.html',
            controller: 'UndercoverCreateCtrl'
        });
    }])
    .controller('UndercoverCreateCtrl', ['$scope', function ($scope) {
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
            } else if($scope.total < 18){
                $scope.undercover = 4;
                $scope.blank = $scope.hasBlank ? 3 : 0;
            } else{
                $scope.undercover = 5;
                $scope.blank = $scope.hasBlank ? 3 : 0;
            }
            $scope.civilian = $scope.total - $scope.undercover - $scope.blank;
        };

        function connectCallback(){
            console.log("connected")
        }

        function errorCallback(error){
            console.log(error)
        }

        $scope.create = function () {
            var client = Stomp.client("ws://localhost:8080/stomp");
            client.connect({}, connectCallback, errorCallback);
        }
    }]);