export default class StartModalController {

    $scope: angular.IScope | any;
    $http: angular.IHttpService;

    constructor($scope: angular.IScope | any, $http: angular.IHttpService) {
        this.$scope = $scope;
        this.$http = $http;
        $scope.onStart = this.onStart;
    }

    onStart = () => {
        this.$scope.starting = true;
        let setting = "U-" + this.$scope.undercover + ",C-" + this.$scope.civilian;
        if (this.$scope.hasBlank) setting += ",B-" + this.$scope.blank;
        this.$http.get(SERVER_URL + "/dealer/start", {
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
