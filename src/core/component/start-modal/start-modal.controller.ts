export default class StartModalController {

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
        let setting = "U-" + this.$scope.undercover + ",C-" + this.$scope.civilian;
        if (this.$scope.hasBlank) setting += ",B-" + this.$scope.blank;
        this.$http.get(this.serverURL + "/dealer/start", {
            params: {
                id: this.$scope.roomId,
                type: 0,
                setting
            }
        }).then((response) => {
            console.log("start->", response);
            this.$scope.onStarted();
        });
    }
}
