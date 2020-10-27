export default class RoomController {

    constructor($scope, $location, $http, initData) {
        console.log("sdfasdf", SERVER_URL);
        $scope.create = function () {
            $scope.creating = true;
            $http.get(SERVER_URL + "/dealer/createRoom").then(function (response) {
                console.log(response);
                $scope.creating = false;
                initData.roomId = response.data.data.roomId;
                initData.userId = response.data.data.id;
                $location.path("/undercover/play").search({"host": 1});
            }, function (reason) {
                $scope.creating = false;
                $scope.error = reason.statusText || "连接服务器失败！";
            });
        };

        $scope.join = function (roomId) {
            $scope.joining = true;
            $http.get(SERVER_URL + "/dealer/joinRoom", {params: {id: roomId}}).then(function (response) {
                console.log(response);
                $scope.joining = false;
                if (response.data.error) {
                    $scope.error = response.data.error;
                } else {
                    initData.roomId = response.data.data.roomId;
                    initData.userId = response.data.data.id;
                    $location.path("/undercover/play");
                }
            }, function (reason) {
                $scope.joining = false;
                $scope.error = reason.statusText || "连接服务器失败！";
            });
        };
    }
}
