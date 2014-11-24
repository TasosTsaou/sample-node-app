/**
 * This handles the login of users.
 */
var express = require('express');
var router = express.Router();
var Promise = require('promise');
var moment = require('moment');
var _ = require('underscore');
var color = require('cli-color');
var db = require('../../database');
var Users = db.users;
//var cache = require('memory-cache');

//define db Interface
var dbInterface = db.dbInterface;

// The POST /login route
router.post('/', function (req, res) {
    console.log('login requested');
    //save request body in a variable
    var body = req.body;
    var time = moment().format('MMMM Do YYYY, h:mm:ss a');
    var checkAuth;
    //Authenticate user by calling the db interface to handle it.

    dbInterface.doAuthentication(body, checkAuth).then(function (result) {
        //when authentication procedure ands,continue
        //console.log('[login]:Inside authentication.then');

        console.log('login promise delivered:' + result);
        checkAuth = result;


        //create and send the responce to client
        var answer = function (err, body, auth) {
            //console.log('[login]:inside answer, auth is: ' + auth);
            // If there's an error, log it and return to user
            //console.log('user:' + body.username);
            //console.log('password:' + body.password);
            if (err) {
                console.log('[login]:found error');
                // Nice log message on your end, so that you can see what happened
                console.log('Couldn\'t authenticate user at ' + color.red(time) + ' by ' + color.red(body.username) + ' because of: ' + err);

                // send the error
                result.status(500).json({
                    'message': 'Internal server error from user login. Please contact support@yourproject.com.'
                });
            } else {
                console.log('auth:' + auth);
                // If user authentication failed, inform user
                if (!auth) {
                    console.log('[login]:user:' + color.red(body.username) + ' login failed at ' + color.red(time));

                    res.status(409).json({
                        'message': body.username + ' login failed!'
                    });


                } else {
                    //  If user authentication successfull, inform user
                    console.log('[login]:Authentication successful for user ' + color.green(body.username) + ' in ' + color.green(body.branch));

                    res.status(201).json({
                        'message': 'Successfully logged in',
                        'loginTime': time
                    });

                }


            }
        };
        //send response to user
        var err = false;
        answer(err, body, checkAuth);
    });

});

// export the router for usage in our server/router/index.js
module.exports = router;