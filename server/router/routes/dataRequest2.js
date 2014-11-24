/**
 * This handles another request for data/calculations etc by client.
 */
var express = require('express');
var router = express.Router();
var Promise = require('promise');
var moment = require('moment');
var _ = require('underscore');
var color = require('cli-color');
var db = require('../../database');


//define db Interface
var dbInterface = db.dbInterface;
// The POST route
router.post('/', function (req, res) {

    var body = req.body;
    var time = moment().format('MMMM Do YYYY, h:mm:ss a');
    var dataset;

    dbInterface.getDataFromDB(body, dataset, 2).then(function (result) {

        console.log('dataRequest2 promise delivered:' + result);
        dataset = result;
        console.log('dataRequest2 after call:' + dataset);


        var answer = function (err, body, dataset) {
            console.log('[dataRequest2]:inside answer,dataset is: ' + dataset);
            // If there's an error, log it and return to user
            console.log('date:' + body.date);

            if (err) {
                console.log('[dataRequest2]:found error');
                // Nice log message on your end, so that you can see what happened
                console.log('Couldn\'t retrieve data at ' + color.red(time) + ' for date: ' + color.red(body.date) + ' because of: ' + err);

                // send the error
                res.status(500).json({
                    'message': 'Internal server error from dataRequest2. Please contact support@yourproject.com.'
                });
            } else {
                console.log('dataset:' + dataset);
                // If user authentication failed, inform user
                if (!dataset) {
                    console.log('[dataRequest2]:date:' + color.red(body.date) + ' dataRequest2 failed at ' + color.red(time));

                    res.status(409).json({
                        'message': body.date + ' dataRequest2 failed!'
                    });


                } else {
                    //  If user authentication successfull, inform user
                    console.log('[dataRequest2]:Request successful for date ' + color.green(body.date) + ' in ' + color.green(body.branch));
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