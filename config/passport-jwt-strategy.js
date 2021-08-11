const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt; //json web token

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), //from where the token is extracted?
    secretOrKey : 'codial' //encryption and decryption string
}

passport.use(new JWTStrategy(opts,function(jwtPayload,done){// done is the callback function

    User.findById(jwtPayload._id ,function(err,user){
        if(err){console.log('Error in finding user',err); return;}

        if(user){
            return done(null,user); //null is the error which means no error
        }else{
            return done(null,false);
        }
    })
}))

module.exports = passport;