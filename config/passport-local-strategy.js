const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField : 'email' //in the db schema
    },
    function(email,password,done){ //done is callback function
        //find the user and establish the identity
        User.findOne({email: email}, function(err,user){
            if(err){
                console.log('Error in finding user--> Password');
                return done(err);
            }

            if(!user || user.password!= password ){ //user not found or pass doesn't match
                console.log('Invalid username/password');
                return done(null, false); //first error , result of authentication
            }
            
            return done(null,user);
        });
        
    }
));

//serialize the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id) // only store the id in cookie
})
//deserialize the user from the key in the cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user--> Passport');
            return done(err);
        }
        return done(null,user);
    });
});

passport.checkAuthentication = function(req, res, next){

    //if singed in then pass on the req to next(controller)
    if(req.isAuthenticated()){
        return next()
    }

    //if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user; //users information in req.user send to resonse locals for views
    }
    next();
}

module.exports = passport;