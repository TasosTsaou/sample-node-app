/**
 * This handles a data/calculation/businessLogic request from client.
 */
var express = require('express');
var router = express.Router();
var Promise = require('promise');
var moment = require('moment');
var _ = require('underscore');
var color = require('cli-color');
var db = require('../../database');
//var Users = db.users;
var cache = require('memory-cache');


//define db Interface
var dbInterface = db.dbInterface;

// The POST /dataRequest1 route
router.post('/', function (req, res) {

    var body = req.body;
    var time = moment().format('MMMM Do YYYY, h:mm:ss a');
    var dataset;

    //ask db Interface to handle the request
    dbInterface.getDataFromDB(body, dataset, 1).then(function (result) {

        console.log('[dataRequest1] promise delivered:' + result);
        dataset = result;
        console.log('[dataRequest1] after call:' + dataset);

        //Create and send the response to client
        var answer = function (err, body, dataset) {
            console.log('[dataRequest1]:inside answer,dataset is: ' + dataset);
            // If there's an error, log it and return to user
            console.log('date:' + body.date);

            if (err) {
                console.log('[dataRequest1]:found error');
                // Nice log message on your end, so that you can see what happened
                console.log('Couldn\'t retrieve data at ' + color.red(time) + ' for date: ' + color.red(body.date) + ' because of: ' + err);

                // send the error
                res.status(500).json({
                    'message': 'Internal server error from beds on clinic. Please contact support@yourproject.com.'
                });
            } else {
                console.log('dataset:' + dataset);
                // If user authentication failed, inform user
                if (!dataset) {
                    console.log('[dataRequest1]:date:' + color.red(body.date) + ' request failed at ' + color.red(time));

                    res.status(409).json({
                        'message': body.date + ' [dataRequest1] failed!'
                    });


                } else {
                    //  If request is successfull, inform user
                    console.log('[dataRequest1]:Request successful for date ' + color.green(body.date) + ' in ' + color.green(body.branch));
                    res.header("content-type: application/json");
                    res.status(201).json({
                        'message': 'Successfully fetched data',
                        'dataset': JSON.stringify(dataset)
                    });

                }


            }
        };
        //send response to user
        var err = false;
        answer(err, body, dataset);
    });

});

// export the router for usage in our server/router/index.js
module.exports = router;