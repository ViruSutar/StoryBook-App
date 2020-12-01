var localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User=require('../Models/User')

module.exports = function (passport) {
    passport.use(new localStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.findOne({ email: email }, (err, data) => {
            if (err) throw err;
            if (!data) {
                return done(null, false, { message: "User Doesn't Exists.." });
            }
            bcrypt.compare(password, data.password, (err, match) => {
                if (err) {
                    return done(null, false);
                }
                if (!match) {
                    return done(null, false, { message: "Password Doesn't Match" });
                }
                if (match) {
                    return done(null, data);
                }
            });
        });
    }));

    passport.serializeUser((user, cb)=> {
        cb(null, user.id);
    });

    passport.deserializeUser( (id, cb)=> {
        User.findById(id, (err, user)=> {
            cb(err, user);
        });
    });
}
// ---------------
// end of autentication statregy