class UndercoverPlayRouteConfig {

    constructor($routeProvider: angular.route.IRouteProvider) {
        $routeProvider.when('/undercover/play', {
            templateUrl: 'undercover/play/play.html',
            controller: 'UndercoverPlayCtrl'
        });
    }
}

const ShowWordFilter = function () {
    return function (word: String, show: Boolean): String {
        return show ? word : "****";
    }
};

const ResultFilter = function () {
    return function (users: Array<User>, show: String): String {
        var result;
        switch (show) {
            case 'U':
            case 'C':
            case 'B':
                result = users.filter(function (user) {
                    return user.role === show;
                }).map(function (user) {
                    return user.id
                }).join(',');
                break;
            case 'A':
                result = users.filter(function (user) {
                    return user.status !== -1;
                }).map(function (user) {
                    return user.id
                }).join(',');
                break;
            case 'O':
                result = users.filter(function (user) {
                    return user.status === -1;
                }).map(function (user) {
                    return user.id
                }).join(',');
                break;
        }
        if (!result) result = "无";
        return result;
    }
};

class UndercoverPlayController {
    constructor($scope, $location, $interval, $timeout, $http, serverURL, initData) {
        $scope.roomId = initData.roomId;
        $scope.userId = initData.userId;
        $scope.users = [];
        $scope.host = $location.search().host;
        $scope.message = "请房主等待所有玩家加入后点击“开始游戏”";
        $scope.cannotStart = true;
        $scope.hasBlank = false; //only host
        $scope.undercover = 0;
        $scope.min = 1;
        $scope.total = 0;
        $scope.civilian = 0;
        $scope.blank = 0;
        $scope.word = null;
        $scope.started = false; //only host
        $scope.overMessage = "";

        $scope.selected = 0;

        var userUpdateTime = 0;
        var roleUpdateTime = 0;

        var heartbeatTime = 3000;

        var heartbeatTimer;

        function heartbeat() {
            $http.get(serverURL + "/dealer/heartbeat", { params: { i: $scope.roomId, u: userUpdateTime, r: roleUpdateTime } }).then(function (response) {
                console.log("heartbeat->", response.data);
                if (response.data == 1) {
                    updateUsers();
                } else if (response.data == 2) {
                    updateWord();
                }
            });
        }

        function updateUsers() {
            $http.get(serverURL + "/dealer/users", { params: { id: $scope.roomId } }).then(function (response) {
                console.log("updateUsers->", response);
                var room = response.data;
                $scope.users = room.users;
                $scope.total = $scope.users.length;
                $scope.cannotStart = $scope.total < $scope.min;
                userUpdateTime = room.lastUserTime;

                checkEndGame();
            });
        }


        function checkEndGame() {
            if ($scope.word) {
                var notOutPlayer = $scope.users.filter(function (user) {
                    return user.status != -1;
                });

                var notOutUndercovers = notOutPlayer.filter(function (user) {
                    return user.role === "U";
                });

                var notOutCivilian = notOutPlayer.filter(function (user) {
                    return user.role === "C";
                });

                var notOutBlank = notOutPlayer.filter(function (user) {
                    return user.role === "B";
                });

                if (notOutCivilian.length + notOutBlank.length <= notOutUndercovers.length) {
                    gameOver("卧底胜利！");
                } else if (notOutUndercovers.length === 0) {
                    gameOver("平民胜利！");
                }
            }
        }

        function gameOver(message) {
            console.log(message);
            $scope.uWord = $scope.users.find(function (user) {
                return user.role === "U";
            }).word;
            $scope.cWord = $scope.users.find(function (user) {
                return user.role === "C";
            }).word;
            $scope.overMessage = message;
            // @ts-ignore
            $('#endModal').modal('show');

            $interval.cancel(heartbeatTimer);
            if ($scope.host) {
                $timeout(function () {
                    $http.get(serverURL + "/dealer/close", { params: { roomId: $scope.roomId } }).then(function (response) {
                        console.log("close->", response);
                    });
                }, heartbeatTime * 2 + 100);
            }
        }

        function updateWord() {
            $http.get(serverURL + "/dealer/word", { params: { roomId: $scope.roomId, userId: $scope.userId } }).then(function (response) {
                console.log("updateWord->", response);
                $scope.started = true;
                $scope.word = response.data.word;
                $scope.first = response.data.first;
                roleUpdateTime = response.data.lastRoleTime;
                $scope.undercover = response.data.u;
                $scope.civilian = response.data.c;
                $scope.blank = response.data.b;
                $scope.message = "游戏已开始：" + $scope.civilian + "平民，" + $scope.undercover + "卧底，" + $scope.blank + "白板。"
            });
        }

        $scope.onSelectUser = function (id) {
            if ($scope.host && $scope.started) $scope.selected = id;
        };

        $scope.onBack = function () {
            $location.path("/");
        };

        $scope.onOutPlayer = function () {
            $scope.outing = true;
            $http.get(serverURL + "/dealer/out", { params: { roomId: $scope.roomId, userId: $scope.selected } }).then(function (response) {
                console.log("out->", response);
                $scope.outing = false;
                if (response.status == 200) {
                    $scope.selected = 0;
                    updateUsers();
                }
            });
        };

        $scope.onChangeShow = function (show) {
            $scope.show = show;
        };

        /**
         * only host
         * @param hasBlank
         */
        $scope.onChangeNumber = function (hasBlank) {
            if (hasBlank !== undefined) $scope.hasBlank = hasBlank;
            if ($scope.total < 6) {
                $scope.undercover = 1;
                $scope.blank = $scope.hasBlank ? 1 : 0;
            } else if ($scope.total < 9) {
                $scope.undercover = 2;
                $scope.blank = $scope.hasBlank ? 1 : 0;
            } else if ($scope.total < 12) {
                $scope.undercover = 2;
                $scope.blank = $scope.hasBlank ? 2 : 0;
            } else if ($scope.total < 15) {
                $scope.undercover = 3;
                $scope.blank = $scope.hasBlank ? 2 : 0;
            } else if ($scope.total < 18) {
                $scope.undercover = 4;
                $scope.blank = $scope.hasBlank ? 3 : 0;
            } else {
                $scope.undercover = 5;
                $scope.blank = $scope.hasBlank ? 3 : 0;
            }
            $scope.civilian = $scope.total - $scope.undercover - $scope.blank;
        };

        if (!$scope.roomId) {
            $location.path("/")
        } else {
            updateUsers();
            heartbeatTimer = $interval(heartbeat, heartbeatTime);
        }
    }
}

angular.module('dealer.undercover')
    .config(UndercoverPlayRouteConfig)
    .directive('playInfo', PlayInfoDirective)
    .directive('startModal', StartModalDirective)
    .directive('endModal', EndModalDirective)
    .filter('showWord', [ShowWordFilter])
    .filter('result', [ResultFilter])
    .controller('StartModalCtrl', StartModalController)
    .controller('UndercoverPlayCtrl', UndercoverPlayController);
