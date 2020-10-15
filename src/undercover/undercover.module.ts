import * as angular from 'angular';
import {CreateJoinRoomController, CreateJoinRoomDirective} from "../core/component/create-join-room/create-join-room";
import UndercoverRouteConfig from "./undercover.route";


angular.module('dealer.undercover', ['ngRoute', 'dealer.services'])
    .directive('createJoinRoom', CreateJoinRoomDirective)
    .controller('CreateJoinRoomCtrl', CreateJoinRoomController)
    .config(UndercoverRouteConfig);
