'use strict';

angular.module('dealer.services', [])
    // .constant('serverURL', "http://localhost:8080")
    .constant('serverURL', "https://wycode.cn/web/api/public")
    .service('initData', function () {
        this.roomId = 0;
        this.userId = 0;
    })