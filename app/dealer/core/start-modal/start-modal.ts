const StartModalDirective = function (): angular.IDirective {
    return {
        restrict: 'E',
        templateUrl: 'core/start-modal/start-modal.html',
        controller: 'StartModalCtrl',
    }
};

class StartModalController {

    $scope: angular.IScope | any;
    $http: angular.IHttpService;
    serverURL: string;

    constructor($scope: angular.IScope | any, $http: angular.IHttpService, serverURL: string) {
        this.$scope = $scope;
        this.$http = $http;
        this.serverURL = serverURL;
        $scope.onStart = this.onStart;
    }

    onStart = () => {
        this.$scope.starting = true;
        let roles = "U-" + this.$scope.undercover + ",C-" + this.$scope.civilian;
        if (this.$scope.hasBlank) roles += ",B-" + this.$scope.blank;
        this.$http.get(this.serverURL + "/dealer/start", {
            params: {
                id: this.$scope.roomId,
                roles: roles
            }
        }).then((response) => {
            console.log("start->", response);
            this.$scope.starting = false;
        });
    }
}
