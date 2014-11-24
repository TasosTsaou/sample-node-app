//this is the module that connects the app with the database. I used promises and tedious driver to get it to function properly.
var sql = require('mssql');
var dbconfig = require('../config');
var Promise = require('promise');
//var cache = require('memory-cache');


//get the appropriate connection info according to user selection
var _getConfig = function (branch) {
    var config;
    switch (branch) {
    case 'DBserver1':
        //choose the appropriate connection
        config = dbconfig.DBserver1;
        break;
    case 'DBserver2':
        config = dbconfig.DBserver2;
        break;
    case 'DBserver3':
        config = dbconfig.DBserver3;
        break;
    default:
        //default is DBserver1
        config = dbconfig.DBserver1;
    }

    //fill in other needed options
    config.options = {
        //encrypt: true //for azure only
        pool: {
            max: 50, //The maximum number of connections there can be in the pool (default: 10).
            min: 0, //The minimun of connections there can be in the pool (default: 0).
            idleTimeoutMillis: 30000 //The Number of milliseconds before closing an unused connection (default: 30000).
        }
    };
    return config;

};

//THIS FUNCTION IS CALLED FOR LOGIN (PROMISE WORKING CORRECTLY,use .then() on call)
this.doAuthentication = function doAuthentication(info, checkauth) {
    return new Promise(function (fulfill, reject) {
        console.log('[mssqlInterface]:starting authentication...user,pass,branch:' + info.username + ',' + info.password + ',' + info.branch);

        //here we decide which db connection to use according to the user login info    
        var myconfig = _getConfig(info.branch);
        console.log('config created');

        var _authenticate = function (user, password) {
            var _connection = new sql.Connection(myconfig);
            console.log('[mssqlInterface]:Connection created');
            var auth;
            //console.log('[mssqlInterface]:User authentication query...');

            _connection.connect(function (err) {
                // ... error checks
                if (err) {
                    // Nice log message on your end, so that you can see what happened
                    console.log('[mssqlInterface]:ERROR found while connecting : ' + err);
                    _connection.close();
                    reject(err);
                }
                // Query
                //console.log('[mssqlInterface]:Inside Connect..');
                var request = new sql.Request(_connection);



                var qString = 'Here goes your T-SQL query with Password = \'' + password + '\'and UserName = \'' + user + '\'';


                //query promise
                function execQuery(queryString) {
                    return new Promise(function (fulfill, reject) {
                        request.query(queryString, function (err, recordset) {
                            var auth;
                            // ... error checks
                            if (err) {
                                // Nice log message on your end, so that you can see what happened
                                console.log('[mssqlInterface]:found error on query request: ' + err);
                                _connection.close();
                                reject(err);
                            } else {
                                //all has gone well so we retrieve the records/value fetched
                                if (recordset[0]) {

                                    console.log('[mssqlInterface]:user is authenticated, ID is:' + recordset[0].ID);
                                    console.log('[mssqlInterface]:closing connection..');
                                    _connection.close();
                                    auth = true;
                                    //cache.put('auth', 'true', 10000);
                                    //fulfill the promise
                                    fulfill(auth);
                                } else {
                                    console.log('[mssqlInterface]:login incorrect');
                                    console.log('[mssqlInterface]:closing connection..');
                                    _connection.close();
                                    //cache.put('auth', 'false', 10000);
                                    //fulfill the promise
                                    fulfill(auth);
                                }

                            }
                        });
                    });
                }

                //execute query and waiting promise
                execQuery(qString).then(function (res) {
                    console.log('qString is: ' + qString);
                    //auth = cache.get('auth');
                    console.log('query promise delivered:' + res);
                    checkauth = res;
                    fulfill(checkauth);
                });
            });




            console.log('authentication returning...');
        }(info.username, info.password);
    });
};

//function that performs queries to db,according to option which defines
// the kind of query string.It's set up as a promise function. 
this.getDataFromDB = function (info, dataset, option) {
    return new Promise(function (fulfill, reject) {
        var myconfig = _getConfig(info.branch);
        var _getData = function (info, dataset, option) {
            var _connection = new sql.Connection(myconfig);
            console.log('[mssqlInterface]:Connection created');

            _connection.connect(function (err) {
                // ... error checks
                if (err) {
                    // Nice log message on your end, so that you can see what happened
                    console.log('[mssqlInterface]:ERROR found while connecting : ' + err);
                    _connection.close();
                    reject(err);
                }
                // Query
                //console.log('[mssqlInterface]:Inside Connect..');
                var request = new sql.Request(_connection);
                var qString;
                //form the querystring according to user option
                if (option === 1) {
                    qString = 'Write your SQL query here';
                } else if (option === 2) {
                    qString = 'Write your SQL query here';
                } else if (option === 3) {
                    console.log(info.date + ',' + info.depID);
                    qString = 'Write your SQL query here';
                }

                //query promise
                function execQuery(queryString) {
                    return new Promise(function (fulfill, reject) {
                        request.query(queryString, function (err, recordset) {

                            // ... error checks
                            if (err) {
                                // Nice log message on your end, so that you can see what happened
                                console.log('[mssqlInterface]:found error on query request: ' + err);
                                _connection.close();
                                reject(err);
                            } else {
                                //all has gone well so we retrieve the records/value fetched
                                if (recordset[0]) {

                                    console.log('[mssqlInterface]:bedInfo fetched, a sample is:' + recordset[0]);
                                    console.log('[mssqlInterface]:closing connection..');
                                    _connection.close();
                                    //auth = true;
                                    //cache.put('auth', 'true', 10000);
                                    fulfill(recordset);
                                } else {
                                    console.log('[mssqlInterface]:No data found!');
                                    console.log('[mssqlInterface]:closing connection..');
                                    _connection.close();
                                    //cache.put('auth', 'false', 10000);
                                    fulfill(recordset);
                                }

                            }
                        });
                    });
                }
                //execute query and waiting promise
                execQuery(qString).then(function (res) {
                    console.log('qString is: ' + qString);
                    //auth = cache.get('auth');
                    console.log('query promise delivered:' + res);
                    dataset = res;
                    fulfill(dataset);
                });

            });
        }(info, dataset, option);
    });
};



// Stored Procedure Example
//procedures will be called from 'public' functions
//var request = new sql.Request(_connection);
//request.input('input_parameter', sql.Int, 10);
//request.output('output_parameter', sql.VarChar(50));
//request.execute('procedure_name', function (err, //recordsets, returnValue) {
// ... error checks

// console.dir(recordsets);
//});


module.exports = this;