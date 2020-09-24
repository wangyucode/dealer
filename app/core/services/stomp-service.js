'use strict';

angular.module('dealer.services', [])
    .factory("stompClient", function () {
        return new StompJs.Client({
            brokerURL: "ws://localhost:8080/stomp",
            connectHeaders: {
                code: "dealer"
            },
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 15000,
            heartbeatIncoming: 10000,
            heartbeatOutgoing: 10000
        });;
    });