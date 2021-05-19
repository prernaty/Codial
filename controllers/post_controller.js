const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){console.log('error'); return;}

        return res.redirect('back');
    })
}

module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function(err,post){ //we will get id thorugh the URL
        if(post.user == req.user.id){ //to check that the user who posted it deletes only, comparing string id by converting
            post.remove();
            Comment.deleteMany({post: req.params.id},function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    })
}