/**
 * Our Database Interface: Here we can change which Driver to use,which server etc. For now it does nothing.
 */
var mongoose = require('mongoose');
var UserModel = require('./schemas/users');
var dbInterface = require('./dbInterfaces/msSQLserver');
// Connections for mongo
var developmentDb = 'localhost:12345/test';
var productionDb = 'urlToYourProductionMongoDb';
var usedDb;

console.log('[db.index]:application ENV=' + process.env.NODE_ENV);

// If we're in development...
if (process.env.NODE_ENV === 'development' || 'undefined') {
    console.log('[db.index]:preparing to connect');
    // set our database to the development one
    dbInterface = require('./dbInterfaces/msSQLserver');

}

// If we're in production...
if (process.env.NODE_ENV === 'production') {
    // set our database to the production one (currently the same file)
    dbInterface = require('./dbInterfaces/msSQLserver');

}


//export user model!
exports.users = UserModel;
exports.dbInterface = dbInterface;