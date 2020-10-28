import * as angular from 'angular';
import UndercoverRouteConfig from "./undercover.route";
import RoomDirective from "../core/component/room/room";
import RoomController from "../core/component/room/room.controller";

export class InitData {
    roomId: number;
    userId: number;
}

angular.module('dealer.undercover', ['ngRoute', 'dealer.play'])
    .directive('createJoinRoom', RoomDirective)
    .service('initData', [InitData])
    .controller('CreateJoinRoomCtrl', RoomController)
    .config(UndercoverRouteConfig);
