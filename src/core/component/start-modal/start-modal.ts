import './start-modal.html'

export default function StartModalDirective(): angular.IDirective {
    return {
        restrict: 'E',
        templateUrl: 'core/component/start-modal/start-modal.html',
        controller: 'StartModalCtrl',
    }
};
