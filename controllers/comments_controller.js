const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create =async function(req, res){
    try{
        let post = await Post.findById(req.body.post);
        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
                // handle error

                post.comments.push(comment);
                post.save();
                if(req.xhr){
                    return res.status(200).json({
                        data: {
                            comment: comment
                        },
                        message: "Comment created"
                    });
                }
                res.redirect('/');
            
        }
    }catch(err){
        console.log(err);
        return
    }
    

        

}

module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            //finding the post so that we can delete it from that post array as well
            let postId = comment.post;
            comment.remove();

            await Post.findByIdAndUpdate(postId,{$pull:{comments: req.params.id}})
                return res.redirect('back');
             // this is to pull the comment from comment array

        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return;
    }
    
}