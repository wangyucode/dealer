import {InitData, Users, User, UserWord} from "../types";
import {IPromise} from "angular";


const HEARTBEAT_TIME = 3000;

export default class UndercoverPlayController {

    private userUpdateTime = 0;
    private roleUpdateTime = 0;
    private heartbeatTimer: IPromise<any>;

    constructor(private $scope: angular.IScope | any,
                private $location: angular.ILocationService,
                private $interval: angular.IIntervalService,
                private $timeout: angular.ITimeoutService,
                private $http: angular.IHttpService,
                private serverURL: string,
                private initData: InitData) {
        $scope.roomId = initData.roomId;
        $scope.userId = initData.userId;
        $scope.users = [];
        $scope.host = $location.search().host;
        $scope.message = "请房主等待所有玩家加入后点击“开始游戏”";
        $scope.cannotStart = true;
        $scope.hasBlank = false; //only host
        $scope.undercover = 0;
        $scope.min = 4;
        $scope.total = 0;
        $scope.civilian = 0;
        $scope.blank = 0;
        $scope.word = null;
        $scope.started = false; //only host
        $scope.overMessage = "";
        $scope.selected = 0;
        $scope.onSelectUser = this.onSelectUser;
        $scope.onBack = this.onBack;
        $scope.onOutPlayer = this.onOutPlayer; //only host
        $scope.onChangeShow = this.onChangeShow;
        $scope.onChangeUserCount = this.onChangeUserCount; //only host
        $scope.onStarted = this.updateWord;

        if (!this.$scope.roomId) {
            this.$location.path("/")
        } else {
            this.updateUsers();
            this.heartbeatTimer = this.$interval(this.heartbeat, HEARTBEAT_TIME);
        }
    }

    updateUsers(): IPromise<any> {
        return this.$http.get(this.serverURL + "/dealer/users", {params: {id: this.$scope.roomId}}).then((response) => {
            console.log("updateUsers->", response);
            let usersWithUpdateTime = response.data as Users;
            this.$scope.users = usersWithUpdateTime.users;
            this.$scope.total = this.$scope.users.length;
            this.$scope.cannotStart = this.$scope.total < this.$scope.min;
            this.userUpdateTime = usersWithUpdateTime.lastUserTime;
            this.onChangeUserCount(this.$scope.hasBlank);
        });
    }

    updateWord = () => {
        this.$http.get(this.serverURL + "/dealer/word", {
            params: {
                roomId: this.$scope.roomId,
                userId: this.$scope.userId
            }
        }).then((response) => {
            console.log("updateWord->", response);
            let userWord = response.data as UserWord;
            this.$scope.starting = false;
            this.$scope.started = true;
            this.$scope.word = userWord.word;
            this.$scope.first = userWord.first;
            this.roleUpdateTime = userWord.lastRoleTime;
            this.$scope.undercover = userWord.u;
            this.$scope.civilian = userWord.c;
            this.$scope.blank = userWord.b;
            this.$scope.message = `游戏已开始：${this.$scope.civilian}平民，${this.$scope.undercover}卧底，${this.$scope.blank}白板。`
        });
    };

    gameOver(message: string) {
        console.log(message);
        this.$scope.uWord = this.$scope.users.find(function (user) {
            return user.role === "U";
        }).word;
        this.$scope.cWord = this.$scope.users.find(function (user) {
            return user.role === "C";
        }).word;
        this.$scope.overMessage = message;
        // @ts-ignore
        $('#endModal').modal('show');

        this.$interval.cancel(this.heartbeatTimer);
        if (this.$scope.host) {
            this.$timeout(() => {
                this.$http.get(this.serverURL + "/dealer/close", {params: {roomId: this.$scope.roomId}}).then(function (response) {
                    console.log("close->", response);
                });
            }, HEARTBEAT_TIME * 2 + 100);
        }
    }

    heartbeat = () => {
        this.$http.get(this.serverURL + "/dealer/heartbeat", {
            params: {
                i: this.$scope.roomId,
                u: this.userUpdateTime,
                r: this.roleUpdateTime
            }
        }).then((response) => {
            console.log("heartbeat->", response.data);
            switch (response.data) {
                case 1:
                    this.updateUsers();
                    break;
                case 2:
                    this.updateWord();
                    break;
                case 3:
                    this.updateUsers().then(() => this.gameOver("卧底胜利！"));
                    break;
                case 4:
                    this.updateUsers().then(() => this.gameOver("平民胜利！"));
                    break;
            }
        });
    };


    onSelectUser = (id: number) => {
        if (this.$scope.host && this.$scope.started) this.$scope.selected = id;
    };

    onBack = () => {
        this.$location.path("/");
    };

    onOutPlayer = () => {
        this.$scope.outing = true;
        this.$http.get(this.serverURL + "/dealer/out", {
            params: {
                roomId: this.$scope.roomId,
                userId: this.$scope.selected
            }
        }).then((response) => {
            console.log("out->", response);
            this.$scope.outing = false;
            if (response.status == 200) {
                this.$scope.selected = 0;
                this.updateUsers();
            }
        });
    };

    onChangeShow = (show: boolean) => {
        this.$scope.show = show;
    };

    /**
     * host only
     * @param hasBlank
     */
    onChangeUserCount = (hasBlank: boolean) => {
        this.$scope.hasBlank = hasBlank;
        if (this.$scope.total < 6) {
            this.$scope.undercover = 1;
            this.$scope.blank = this.$scope.hasBlank ? 1 : 0;
        } else if (this.$scope.total < 9) {
            this.$scope.undercover = 2;
            this.$scope.blank = this.$scope.hasBlank ? 1 : 0;
        } else if (this.$scope.total < 12) {
            this.$scope.undercover = 2;
            this.$scope.blank = this.$scope.hasBlank ? 2 : 0;
        } else if (this.$scope.total < 15) {
            this.$scope.undercover = 3;
            this.$scope.blank = this.$scope.hasBlank ? 2 : 0;
        } else if (this.$scope.total < 18) {
            this.$scope.undercover = 4;
            this.$scope.blank = this.$scope.hasBlank ? 3 : 0;
        } else {
            this.$scope.undercover = 5;
            this.$scope.blank = this.$scope.hasBlank ? 3 : 0;
        }
        this.$scope.civilian = this.$scope.total - this.$scope.undercover - this.$scope.blank;
    };
}
