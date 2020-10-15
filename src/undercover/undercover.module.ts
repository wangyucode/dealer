import * as angular from 'angular';
import {CreateJoinRoomController, CreateJoinRoomDirective} from "../core/create-join-room/create-join-room";

class UndercoverRouteConfig {

    constructor($routeProvider) {
        $routeProvider.when('/undercover', {
            templateUrl: 'undercover/undercover.html'
        });
    }
}

angular.module(name, ['ngRoute', 'dealer.services'])
    .directive('createJoinRoom', CreateJoinRoomDirective)
    .controller('CreateJoinRoomCtrl', CreateJoinRoomController)
    .config(UndercoverRouteConfig);
