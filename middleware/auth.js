const User=require('../models/user')
const jwt =require('jsonwebtoken')
const auth=async(req,res,next)=>{
    try{
      const token=req.headers.token
      if(!token)
      throw new Error("login first")
      const decoded=jwt.verify(token,'week')
      const user=await User.findOne({_id:decoded._id,'tokens.token':token})
      if(!user)
      throw new Error("Token invalid")
      req.user=user
      req.token=token
      next()
    }catch(e){
       return res.json({error:e})
    }
 
}
module.exports=auth