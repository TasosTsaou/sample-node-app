'use strict';

angular.module('clientApp') // make sure this is set to whatever it is in your client/scripts/app.js
.controller('LogoutCtrl', function ($scope, $http, $cookieStore) {
    //delete cookie session info 
    $cookieStore.put('id', null);
    $cookieStore.put('loginTime', null);
    $cookieStore.put('branch', null);

    console.log('cookie user:' + $cookieStore.get('id') + ', cookieTime:' + $cookieStore.get('loginTime') + ',' + $cookieStore.get('branch'));
});