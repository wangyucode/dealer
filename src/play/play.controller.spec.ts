import * as angular from "angular";
import "angular-route";
import "angular-mocks";
import UndercoverPlayController from "./play.controller";

describe("Controller", () => {

    let $controller: Function;
    let $rootScope: angular.IScope | any;
    beforeEach(angular.mock.module("dealer.play"));

    beforeEach(inject((_$controller_, _$rootScope_) => {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
    }));
    
    it("should get message from service", () => {
        let $scope = $rootScope.$new();
        let undercoverPlayCtrl = $controller('UndercoverPlayCtrl', { $scope: $scope });
        console.log("123", undercoverPlayCtrl);
        console.log("456", $scope);
        debugger;
    });
});
