'use strict';

angular.module('dealer.undercover')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/undercover/play', {
            templateUrl: 'undercover/play/play.html',
            controller: 'UndercoverPlayCtrl'
        });

    }])
    .controller('UndercoverPlayCtrl', ['$scope',
        '$location',
        '$interval',
        '$http',
        'serverURL',
        'initData',
        function ($scope, $location, $interval, $http, serverURL, initData) {
            $scope.roomId = initData.roomId;
            $scope.userId = initData.userId;
            $scope.host = $location.search().host;

            var userUpdateTime = 0
            var roleUpdateTime = 0



            function heartbeat() {
                $http.get(serverURL + "/dealer/heartbeat", { params: { i: $scope.roomId, u: userUpdateTime, r: roleUpdateTime } }).then(function (response) {
                    console.log("heartbeat->", response.data);
                    if (response.data == 1) {
                        updateUsers();
                    } else if (response.data == 2) {
                        undateRole();
                    }
                });
            }

            function updateUsers() {
                $http.get(serverURL + "/dealer/users", { params: { id: $scope.roomId } }).then(function (response) {
                    console.log("updateUsers->", response);
                    var room = response.data
                    $scope.users = room.users;
                    userUpdateTime = room.lastUserTime;
                });
            }

            function undateRole() {

            }

            if (!$scope.roomId) {
                $location.path("/")
            } else {
                $interval(heartbeat, 1000);
            }
        }]);