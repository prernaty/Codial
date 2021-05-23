
const Post=require('../models/post');
const User=require('../models/user');
const Comment=require('../models/comment');

module.exports.home = async function(req, res){ //async statements
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // });
    try{
        let posts =await  Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate:
            {
                path: 'user'
            }
        });

        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts:posts,
            all_users: users                
            
        });
    }catch(err){
        console.log(err);
        return;
    }    // populate the user of each post
    
       
    /*exec(function(err, posts){
        if(err)
        {
            console.log(err);
            return;
        }
        User.find({},function(err,users){
            return res.render('home', {
                title: "Codeial | Home",
                posts:posts,
                all_users: users                
                
            })
        })
        
    })*/

}

// module.exports.actionName = function(req, res){}