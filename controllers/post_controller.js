const Post = require('../models/post');
const Comment = require('../models/comment');

try{
    module.exports.create = async function(req,res){
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
    
        return res.redirect('back');
    }
}catch(err){
    console.log(err);
    return;
}


module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);

        if(post.user == req.user.id){ //to check that the user who posted it deletes only, comparing string id by converting
            post.remove();
            await Comment.deleteMany({post: req.params.id});
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
    }
}