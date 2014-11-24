/**
 * The Index of Routes. using this module the app knows
 * with which module to handle each incoming request for 
 data + business logic calculations etc.
 */

module.exports = function (app) {

    // The signup route
    app.use('/signup', require('./routes/signup'));
    app.use('/login', require('./routes/login'));
    app.use('/dataRequest1', require('./routes/dataRequest1'));
    app.use('/dataRequest2', require('./routes/dataRequest2'));

};