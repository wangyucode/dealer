class InitData {
    roomId = 0;
    userId = 0;
}

angular.module('dealer.services', [])
    // .constant('serverURL', "http://localhost:8080")
    .constant('serverURL', "https://wycode.cn/web/api/public")
    .service('initData', [InitData]);