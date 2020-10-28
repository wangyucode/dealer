import * as angular from "angular";
import UndercoverPlayRouteConfig from "./play.route";
import UndercoverPlayController from "./play.controller";
import ShowWordFilter from "../core/filter/show-word.filter";
import ResultFilter from "../core/filter/result.filter";
import PlayInfoDirective from "../core/component/play-info/play-info";
import StartModalDirective from "../core/component/start-modal/start-modal";
import StartModalController from "../core/component/start-modal/start-modal.controller";
import EndModalDirective from "../core/component/end-modal/end-modal";


angular.module('dealer.play', ['ngRoute'])
    .config(UndercoverPlayRouteConfig)
    .directive('playInfo', PlayInfoDirective)
    .directive('startModal', StartModalDirective)
    .directive('endModal', EndModalDirective)
    .filter('showWord', [ShowWordFilter])
    .filter('result', [ResultFilter])
    .controller('StartModalCtrl', StartModalController)
    .controller('UndercoverPlayCtrl', UndercoverPlayController);
