'use strict';

angular.module('dealer.directive.createJoinRoom', [])
    .directive('createJoinRoom', function () {
        return {
            restrict: 'A',
            templateUrl: 'core/create-join-room/create-join-room.html',
            controller: 'CreateJoinRoomCtrl'
        }
    })
    .controller('CreateJoinRoomCtrl', ['$scope',
        '$location',
        '$http',
        'serverURL',
        'initData',
        function ($scope, $location, $http, serverURL, initData) {

            $scope.create = function () {
                $scope.creating = true;
                $http.get(serverURL + "/dealer/createRoom").then(function (response) {
                    console.log(response);
                    $scope.creating = false;
                    initData.roomId = response.data.data.roomId
                    initData.userId = response.data.data.id
                    $location.path("/undercover/play").search({ "host": 1 });
                }, function (reason) {
                    $scope.creating = false;
                    $scope.error = reason.statusText || "连接服务器失败！";
                });
            };

            $scope.join = function (roomId) {
                $scope.joining = true;
                $http.get(serverURL + "/dealer/joinRoom", { params: { id: roomId } }).then(function (response) {
                    console.log(response);
                    $scope.joining = false;
                    if (response.data.error) {
                        $scope.error = response.data.error;
                    } else {
                        initData.roomId = response.data.data.roomId
                        initData.userId = response.data.data.id
                        $location.path("/undercover/play");
                    }
                }, function (reason) {
                    $scope.joining = false;
                    $scope.error = reason.statusText || "连接服务器失败！";
                });
            };
        }]);
