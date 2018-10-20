'use strict';
//var passport = require('passport');
module.exports = function(app){
    var userAction = require('../controllers/userController');
//var doLogin = userAction.doLogin();
    //List user action:
    app.route('/register')
    .post(userAction.doRegister);

    app.route('/login')
    .post(userAction.doLogin);
    
    app.route('/update-user')
    .post(userAction.doUpdateUser);
};