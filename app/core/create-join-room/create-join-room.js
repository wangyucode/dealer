'use strict';

angular.module('dealer.directive.createJoinRoom', [])
    .directive('createJoinRoom', function () {
        return {
            restrict: 'E',
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
                $http.get(serverURL + "/dealer/createRoom").then(function (response) {
                    console.log(response);
                    var roomAndUser = response.data.data.split(',')
                    initData.roomId = roomAndUser[0]
                    initData.userId = roomAndUser[1]
                    $location.path("/undercover/play").search({ "host": 1 });
                });
            };

            $scope.join = function (roomId) {
                $http.get(serverURL + "/dealer/joinRoom", { params: { id: roomId } }).then(function (response) {
                    console.log(response);
                    if(response.data.error){
                        $scope.error = response.data.error;
                    }else{
                        var roomAndUser = response.data.data.split(',')
                        initData.roomId = roomAndUser[0]
                        initData.userId = roomAndUser[1]
                        $location.path("/undercover/play");
                    }
                });
            };
        }]);
