'use strict';

angular.module('dealer.services', [])
    .constant('serverURL', "http://localhost:8080")
    .service('initData', function () {
        this.roomId = 0;
        this.userId = 0;
    })