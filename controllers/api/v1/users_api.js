const jwt = require('jsonwebtoken');
const User = require('../../../models/user');
module.exports.createSession =async function(req,res){
    //using flash
    try{
        let user =await User.findOne({email: req.body.email})
        if(!user || user.password != req.body.password){
            return res.json(422,{
                message:"Invalid username or password"
            });
        }
        return res.json(200,{
            message: "Sign in success",
            data:{
                token:jwt.sign(user.toJSON(),'codial',{expiresIn:100000}) //key for encryption
            }
        })
    }catch(err){
        console.log('*******',err);
        return res.json(500,{
            message: "Internal Server error"
        })
    }
    
}