const mongoose = require('mongoose');
//setting  multer for each  page
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email:{
       type: String,
       required: true,
       unique: true 
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    avatar:{
        type:String
    }
},{
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,'..',AVATAR_PATH));//dots for going 2 step up in the directory
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()); //value stored in avatar filed +date
    }
})

//static  method
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar'); //only one file will be uploaed using single
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User', userSchema);

module.exports = User;