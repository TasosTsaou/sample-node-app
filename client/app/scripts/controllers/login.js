'use strict';

angular.module('clientApp') // make sure this is set to whatever it is in your client/scripts/app.js
.controller('LoginCtrl', function ($scope, $http, $cookieStore, $location) { // note the added $http depedency

    //var storageUtil = require('../utils');
    // Here we're creating some local references
    // so that we don't have to type $scope every
    // damn time

    var user,
        login;

    // Here we're creating a scope for our Signup page.
    // This will hold our data and methods for this page.
    $scope.login = login = {};

    // In our signup.html, we'll be using the ng-model
    // attribute to populate this object.
    login.user = user = {};

    // This is our method that will post to our server.
    login.submit = function () {

        // make sure all fields are filled out...
        // aren't you glad you're not typing out
        // $scope.signup.user.firstname everytime now??
        console.log(user.username);
        console.log(user.password);
        console.log(user.branch);
        if (!user.username ||
            !user.password ||
            !user.branch
        ) {
            alert('Please fill out all form fields.');
            return false;
        }

        // make sure the passwords match match
        //if (user.password1 !== user.password2) {
        //   alert('Your passwords must match.');
        //   return false;
        //}

        // Just so we can confirm that the bindings are working
        console.log(user);

        // Make the request to the server 
        var request = $http.post('/login', user);

        // we'll come back to here and fill in more when ready
        request.success(function (data) {



            $cookieStore.put('id', user.username);
            $cookieStore.put('loginTime', data.loginTime);
            $cookieStore.put('branch', user.branch);
            console.log('user data stored in cookies: ' + $cookieStore.get('id') + ',' + $cookieStore.get('loginTime') + ',' + $cookieStore.get('branch'));
            console.log(data);
            $location.path('/home');
            // our json response is recognized as
            // the data parameter here. See? Our msg
            // value is right there!


        });

        request.error(function (data) {
            console.log(data);
            $location.path('/main');
        });
    };

});