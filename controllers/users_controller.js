//const { userInfo } = require("node:os");
const User = require('../models/user');
module.exports.profile = function(req,res){
    res.end('<h1>User Profile</h1>');
}

//render sign up page
module.exports.singUp = function(req,res){
    return res.render('user_sign_up',{
        title: "Codial Sign Up"
    })
}

//render sign In page
module.exports.singIn = function(req,res){
    return res.render('user_sign_in',{
        title: "Codial Sign In"
    })
}

//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err,user){
        if(err){
            console.log('Error in finding user in signing up');
            return;
        }
        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    console.log('Error in creating user while signing up');
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }
        else
            return res.redirect('back');
            
    })
}

//sign in andd create a session for user
module.exports.createSession = function(req,res){
    //TODO
}