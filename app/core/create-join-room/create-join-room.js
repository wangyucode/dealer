'use strict';

function CreateJoinRoomController($location) {
    var ctrl = this;

    ctrl.create = function(){
        $location.path($location.path()+"/create")
    };

    ctrl.join = function(){
        $location.path($location.path()+"/join")
    };
}

angular.module('dealer')
    .component('createJoinRoom', {
        templateUrl: 'core/create-join-room/create-join-room.html',
        controller: CreateJoinRoomController
    });
