'use strict';

angular.module('clientApp') // make sure this is set to whatever it is in your client/scripts/app.js
.controller('HomeCtrl', function ($scope, $http, $location, $cookieStore) {
    console.log('Welcome!!!user data stored in cookies: ' + $cookieStore.get('id') + ',' + $cookieStore.get('loginTime'));
    if ($cookieStore.get('id') !== undefined && $cookieStore.get('id') !== null) {
        console.log('scope username and cookie username match');
        var branch = $cookieStore.get('branch');
        $scope.branch = branch;

    } else {
        $location.path('/main');
    }
});