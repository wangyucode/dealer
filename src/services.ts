import angular = require("angular");

export class InitData {
    roomId: number;
    userId: number;
}

angular.module('dealer.services', [])
    .service('initData', [InitData]);


