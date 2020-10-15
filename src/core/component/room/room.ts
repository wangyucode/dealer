import './room.html'

export default function RoomDirective(): angular.IDirective {
    return {
        restrict: 'E',
        templateUrl: 'core/component/room/room.html',
        controller: 'CreateJoinRoomCtrl'
    }
};



