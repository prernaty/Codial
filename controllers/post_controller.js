const Post = require('../models/post');
const Comment = require('../models/comment');

try{
    module.exports.create = async function(req,res){
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if(req.xhr){// to detect if it is an ajax req
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post created"
            }) // => this is done to receive the data from Post db in Json format
        }
        req.flash('success','Post published');
        return res.redirect('back');
    }
}catch(err){
    req.flash('error', err)
    return res.redirect('back');
}


module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);

        if(post.user == req.user.id){ //to check that the user who posted it deletes only, comparing string id by converting
            post.remove();
            await Comment.deleteMany({post: req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },
                    message:"Post deleted"
                })
            }
            req.flash('success','Post deleted');
            return res.redirect('back');
        }else{
            req.flash('error','You cannot delete this post');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('success',err);
        return res.redirect('back');
    }
}