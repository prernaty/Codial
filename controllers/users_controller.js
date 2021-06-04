//const { userInfo } = require("node:os");
const User = require('../models/user');
const fs = require('fs');
const path = require('path');
module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        res.render('user_profile', {
            title: "Profile",
            profile_user : user
        });
    })
    
}

module.exports.update = async function(req,res){
    //authentication
    /*if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,{name:req.body.name, email: req.body.email},function(err,user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }*/
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){ //multer processes the form data due to multi form, that is why method is needed
                if(err){console.log('***MULTER ERR***',err)}

                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar)) //to delete already stored avatar
                    }
                    //saving the path of the file in avatar filed in user db
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })
        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }else{
        req.flash('error',"Unauthorised");
        return res.status(401).send('Unauthorized');
    }
}

//render sign up page
module.exports.singUp = function(req,res){

    //if user is already singed in then signup page should not be visible
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_up',{
        title: "Codial Sign Up"
    })
}

//render sign In page
module.exports.singIn = function(req,res){

    //when user is alreaddy singedIn then singin page should not be visible
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
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
    //using flash
    req.flash('success','Logged In Successfully'); //name success is not necessary
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout(); //passport function

    req.flash('success','You have Logged out');
    return res.redirect('/');
}