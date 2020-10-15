import angular = require("angular");
import {InitData} from "./types";

angular.module('dealer.services', [])
    // .constant('serverURL', "http://localhost:8080")
    .constant('serverURL', "https://wycode.cn/web/api/public")
    .service('initData', [InitData]);
