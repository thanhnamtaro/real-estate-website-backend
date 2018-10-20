'use strict';
var bodyParser = require('body-parser');
var expressvalidator = require('express-validator');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.doRegister = function(req, res){
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    //var password2 = req.body.password2;
    //checking for email and username are already taken
		User.findOne({ username: { 
			"$regex": "^" + username + "\\b", "$options": "i"
	}}, function (err, user) {
			User.findOne({ email: { 
				"$regex": "^" + email + "\\b", "$options": "i"
		}}, function (err, mail) {
				if (user || mail) {
					// res.render('register', {
					// 	user: user,
					// 	mail: mail
                    // });
                    res.json({
                        message: 'Register Failed',
            
                    })
				}
				else {
					var newUser = new User({
						username: username,
						email: email,
						username: username,
						password: password,
						//avt: '/IMG_0227.jpg'

                    });
            
					User.createUser(newUser, function (err, user) {
						if (err) throw err;
                        res.json({
                            message: 'Register Success',
                            user: user
                        })
					});
				}
			});
		});



    
};
// passport.use(new LocalStrategy(
//     (username, password, done) => {
//        findUser(username, (err, user) => {
//          if (err) {
//            return done(err)
//          }
   
//          // User not found
//          if (!user) {
//            return done(null, false)
//          }
   
//          // Always use hashed passwords and fixed time comparison
//          bcrypt.compare(password, user.passwordHash, (err, isValid) => {
//            if (err) {
//              return done(err)
//            }
//            if (!isValid) {
//              return done(null, false)
//            }
//            return done(null, user)
//          })
//        })
//      }
//    ))

// exports.doLogin = 
//             function (req, res, next) {

//                 if (req.isAuthenticated()) {
//                     res.json(req);
//                     return next()
//                   }
//                   res.redirect('/')
//             };

exports.doUpdateUser = function(req, res){
    var username = req.body.username;
	var email = req.body.email;
	var notes = req.body.notes;
	var phone = req.body.phone;
	var gender = req.body.gender;
	var address = req.body.address;
	var addrCom = req.body.addrCom;
	var birthday = req.body.birthday;
    var company = req.body.company;
    var newUser = new User({
        username: username,
    email: email,
    notes:notes,
    phone: phone,
    birthday: birthday,
    company: company,
    addrCom: addrCom,
    address:address,
    gender: gender

    });

    User.updateuser(newUser, function (err, user) {
        if (err) throw err;
        //console.log(user);
    });
    res.json({
        message: 'Update Success',
        user: newUser
    })
};

exports.doLogin = 
	function (req, res) {
        
        var username = req.body.username;
        var password = req.body.password;
       // var tempuser, ms;

                User.getUserByUsername(username, function (err, user) {
                    //console.log(user.username);
                    if (err) throw err;
                    if (!user) {
                        //return done(null, false, { message: 'Tên tài khoản không đúng' });
                        res.json({message: 'Tên tài khoản không đúng'});
                    }
                    else{
                    User.comparePassword(password, user.password, function (err, isMatch) {
                        if (err) throw err;
                        console.log(user.password);
                      
                        if (isMatch) {
                            //return done(null, user);
                            
                            res.json({message: 'Login success',user: user});
                            //return ms;
                        } else {
                            //return done(null, false, { message: 'Mật khẩu không hợp lệ' });
                            res.json({ message: 'Mật khẩu không hợp lệ' });
                            //return ms;
                        }
                    });
                }
                });
                //res.json({message: ms, user: tempuser});
           
        
	};
// passport.serializeUser(function (user, done) {
// 	done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
// 	User.getUserById(id, function (err, user) {
// 		done(err, user);
// 	});
// });
