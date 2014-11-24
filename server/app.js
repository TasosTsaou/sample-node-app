// import needed modules here
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// set up our app as an express app server
var app = express();

// view engine setup (not needed currently)
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

//use middleware to handle varius tasks

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));


/**
 * Routes: configure the app router,in our case use router/index.js
 */
var router = require('./router')(app);

/**
 * Development Settings:
 */
console.log('[app]:NDE_ENV= ' + app.get('env'));
if (app.get('env') === 'development') {
    // This will change in production since we'll be using the dist folder
    app.use(express.static(path.join(__dirname, '../client')));
    // This covers serving up the index page
    app.use(express.static(path.join(__dirname, '../client/.tmp')));
    app.use(express.static(path.join(__dirname, '../client/app')));

    // Error Handling
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

/**
 * Production Settings
 */
if (app.get('env') === 'production') {

    // changes it to use the optimized version for production
    app.use(express.static(path.join(__dirname, '/dist')));

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,

        });
    });
}




module.exports = app;