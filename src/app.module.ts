import * as angular from 'angular'
import RouteConfig from "./app.route";

// Declare app level module which depends on views, and core components
angular.module('dealer', [
    'ngRoute',
    'dealer.undercover'
]).config(RouteConfig);
