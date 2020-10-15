import * as angular from 'angular';
import UndercoverRouteConfig from "./undercover.route";
import RoomDirective from "../core/component/room/room";
import RoomController from "../core/component/room/room.controller";

angular.module('dealer.undercover', ['ngRoute', 'dealer.services'])
    .directive('createJoinRoom', RoomDirective)
    .controller('CreateJoinRoomCtrl', RoomController)
    .config(UndercoverRouteConfig);
