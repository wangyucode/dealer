'use strict';

angular.module('dealer.undercover')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/undercover/play', {
            templateUrl: 'undercover/play/play.html',
            controller: 'UndercoverPlayCtrl'
        });

    }])
    .controller('UndercoverPlayCtrl', ['$scope', '$location', 'stompClient', function ($scope, $location, stompClient) {
        $scope.showRole = false;
        $scope.roomId = "";

        if ($location.search().host) {
            stompClient.subscribe('/user/queue/dealer/status', function (message) {
                console.log(message);
                if(message.body.error){
                    console.log(message.body.error)
                }else{
                    var payload = JSON.parse(message.body)
                    if(!payload.error){
                        $scope.roomId = payload.data.roomId;
                        $scope.$apply();
                    }
                    
                }
            });
        }

        stompClient.publish({destination: '/app/dealer/status'});

    }]);