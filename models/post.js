const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,//ref to a user in db
        ref : 'User' //which schema
    },
    //include the array of comments(ids)
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]
},{
        timestamps:true
});

const Post = mongoose.model('Post',postSchema);

module.exports =Post;