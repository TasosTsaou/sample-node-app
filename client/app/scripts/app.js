'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
    .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch', 'smart-table', 'ui.bootstrap'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/logout', {
                templateUrl: 'views/main.html',
                controller: 'LogoutCtrl'
            })
            .when('/sampleAuthView1', {
                templateUrl: 'views/auth/sampleAuthView1.html',
                controller: 'authView1Ctrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .when('/signup', {
                templateUrl: 'views/signup.html',
                controller: 'SignupCtrl'
            })
            .when('/sampleAuthView2', {
                templateUrl: 'views/auth/sampleAuthView2.html',
                controller: 'authView2Ctrl'
            })
            .when('/home', {
                templateUrl: 'views/auth/home.html',
                controller: 'HomeCtrl'
            })
            .otherwise({
                redirectTo: '/'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            });

    });