/**
 * This handles the signing up of users. (Currently inactive and erroneous!!)
 */
var express = require('express');
var router = express.Router();
var moment = require('moment');
var _ = require('underscore');
var color = require('cli-color');
var db = require('../../database');
var Users = db.users;
//define db Interface
var dbInterface = db.dbInterface;
//var dbInterface = //require('../../database/dbInterfaces/msSQLserver');
// The POST /signup route
router.post('/', function (req, res) {
    console.log('signup requested');
    // The posted information from the front-end
    var body = req.body;
    console.log('[signup]:request body: ' + body.email);
    // Current time this occurred
    var time = moment().format('MMMM Do YYYY, h:mm:ss a');

    //here goes db search for existing user,and if not found, user creation procedure follows. For safety reasons passwords/usernames should be encrypted!!


    // If the user doesn't exist, create one
    if (!body.user) {
        console.log('[signup]:user doesnt exist');
        console.log('Creating a new user at ' + color.green(time) + ' with the email: ' + color.green(body.email));

        // setup the new user
        var newUser = new Users({
            firstname: body.firstname,
            lastname: body.lastname,
            email: body.email,
            password: body.password1
        });

        console.log('[signup]:User created!');

        // save the user to the database
        // newUser.save(function (err, savedUser, //numberAffected) {

        //               if (err) {
        //                   console.log('Problem saving the user ' //+ color.yellow(body.email) + ' due to ' + err);
        //                   res.status(500).json({
        //                       'message': 'Database error trying //to sign up.  Please contact support@yourproject.com.'
        //                   });
        //               }

        // Log success and send the filtered user back
        //               console.log('Successfully created new //user: ' + color.green(body.email));

        //              res.status(201).json({
        //                  'message': 'Successfully created new //user',
        //                   'client': _.omit(savedUser, //'password')
        //                });
        //
        //           });
    }

    // If the user already exists...
    if (body.user) {
        console.log('[signup]:found user in DB');
        res.status(409).json({
            'message': body.email + ' already exists!'
        });
    }




});

// export the router for usage in our server/router/index.js
module.exports = router;