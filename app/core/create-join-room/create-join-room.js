'use strict';

angular.module('dealer.createJoinRoom', [])
    .component('createJoinRoom', {
        templateUrl: 'core/create-join-room/create-join-room.html',
        controller: 'CreateJoinRoomCtrl'
    })
    .controller('CreateJoinRoomCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.create = function () {
            $location.path($location.path() + "/create")
        };

        $scope.join = function () {
            $location.path($location.path() + "/join")
        };
    }]);
