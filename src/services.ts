import angular = require("angular");
import {InitData} from "./types";

angular.module('dealer.services', [])
    .constant('serverURL', "http://localhost:8080/web/api/public")
    // .constant('serverURL', "https://wycode.cn/web/api/public")
    .service('initData', [InitData]);
