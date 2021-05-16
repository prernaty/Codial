const Post = require('../models/post')

module.exports.home = function(req,res){
    //return res.end('<h1>Express is up for Codial</h1>');
    
    /*Post.find({}, function(err,posts){
        return res.render('home',{
            title: " Codial Home",
            posts: posts
        })
    })*/
    //finding all the users post with the help of the whole user object 
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title: " Codial Home",
            posts: posts
        })
    })
    
}