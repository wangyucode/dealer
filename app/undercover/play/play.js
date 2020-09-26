'use strict';

angular.module('dealer.undercover')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/undercover/play', {
            templateUrl: 'undercover/play/play.html',
            controller: 'UndercoverPlayCtrl'
        });

    }])
    .filter('showWord', function () {
        return function (word, show) {
            return show ? word : "****";
        };
    })
    .filter('result', function () {
        return function (users, show) {
            var result = "";
            switch (show) {
                case 'U':
                case 'C':
                case 'B':
                    result = users.filter(function (user) {
                        return user.role == show;
                    }).map(function (user) {
                        return user.id
                    }).join(',');
                    break;
                case 'A':
                    result = users.filter(function (user) {
                        user.role.status != -1;
                    }).map(function (user) {
                        return user.id
                    }).join(',');
                    break;
                case 'O':
                    result = users.filter(function (user) {
                        user.role.status == -1;
                    }).map(function (user) {
                        return user.id
                    }).join(',');
                    break;
            }
            return result;
        };
    })
    .controller('UndercoverPlayCtrl', ['$scope',
        '$location',
        '$interval',
        '$http',
        'serverURL',
        'initData',
        function ($scope, $location, $interval, $http, serverURL, initData) {
            $scope.roomId = initData.roomId;
            $scope.userId = initData.userId;
            $scope.users = [];
            $scope.host = $location.search().host;
            $scope.message = "请房主等待所有玩家加入后点击“开始游戏”"
            $scope.cannotStart = true;
            $scope.hasBlank = false;
            $scope.undercover = 0;
            $scope.min = 4;
            $scope.total = 0;
            $scope.civilian = 0;
            $scope.blank = 0;
            $scope.word = null;
            $scope.started = false;
            $scope.overMessage = "";

            $scope.selected = 0;

            var userUpdateTime = 0
            var roleUpdateTime = 0

            var heartbeatTimer;

            function heartbeat() {
                $http.get(serverURL + "/dealer/heartbeat", { params: { i: $scope.roomId, u: userUpdateTime, r: roleUpdateTime } }).then(function (response) {
                    console.log("heartbeat->", response.data);
                    if (response.data == 1) {
                        updateUsers();
                    } else if (response.data == 2) {
                        undateWord();
                    }
                });
            }

            function updateUsers() {
                $http.get(serverURL + "/dealer/users", { params: { id: $scope.roomId } }).then(function (response) {
                    console.log("updateUsers->", response);
                    var room = response.data;
                    $scope.users = room.users;
                    $scope.total = $scope.users.length
                    $scope.cannotStart = $scope.total < $scope.min;
                    userUpdateTime = room.lastUserTime;
                    $scope.onChangeNumber($scope.hasBlank);
                    checkEndGame();
                });
            }


            function checkEndGame() {
                if ($scope.started) {
                    if ($scope.civilian + $scope.blank <= $scope.undercover) {
                        gameover("卧底胜利！");
                    } else {
                        var notOutUndercovers = $scope.users.filter(function (user) {
                            return user.role = "U" && user.status != -1
                        });
                        if (notOutUndercovers.length == 0) {
                            gameover("平民胜利！");
                        }
                    }
                }
            }

            function gameover(message) {
                console.log(message)
                $interval.cancel(heartbeatTimer);
                $http.get(serverURL + "/dealer/close", { params: { roomId: $scope.roomId } }).then(function (response) {
                    console.log("close->", response);
                });
                $scope.overMessage = message;
                $('#endModal').modal('show');
            }

            function undateWord() {
                $http.get(serverURL + "/dealer/word", { params: { roomId: $scope.roomId, userId: $scope.userId } }).then(function (response) {
                    console.log("undateWord->", response);
                    $scope.word = response.data.word;
                    $scope.first = response.data.first;
                    roleUpdateTime = response.data.lastRoleTime
                });
            }

            $scope.onSelectUser = function (id) {
                if ($scope.host && $scope.started) $scope.selected = id;
            }

            $scope.onBack = function () {
                $location.path("/");
            }

            $scope.onOutPlayer = function () {
                $scope.outing = true;
                $http.get(serverURL + "/dealer/out", { params: { roomId: $scope.roomId, userId: $scope.selected } }).then(function (response) {
                    console.log("out->", response);
                    $scope.outing = false;
                    if (response.status == 200) {
                        $scope.selected = 0;
                    }
                });
            }

            $scope.onStart = function () {
                $scope.starting = true;
                var roles = "U-" + $scope.undercover + ",C-" + $scope.civilian;
                if ($scope.hasBlank) roles += ",B-" + $scope.blank;
                $http.get(serverURL + "/dealer/start", { params: { id: $scope.roomId, roles: roles } }).then(function (response) {
                    console.log("start->", response);
                    $scope.starting = false;
                    if (response.status == 200) {
                        $scope.started = true;
                        $scope.message = "游戏已开始：" + $scope.civilian + "平民，" + $scope.undercover + "卧底，" + $scope.blank + "白板。"
                    }
                });
            }

            $scope.onChangeShow = function (show) {
                $scope.show = show;
            }

            $scope.onChangeNumber = function (hasBlank) {
                console.log("onChangeNumber", hasBlank);
                $scope.hasBlank = hasBlank;
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
            }


            if (!$scope.roomId) {
                $location.path("/")
            } else {
                heartbeatTimer = $interval(heartbeat, 1000);
            }
        }]);