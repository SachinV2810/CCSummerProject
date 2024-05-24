
const admin = require('../config/firebase-config');
const User =require('../models/user');
const isLoggedIn=async(req,res,next)=>{
        try{
            const token=req.headers.authorization.split(' ')[1];
            const decodeValue=await admin.auth().verifyIdToken(token);
            if(decodeValue){

                    return res.json({msg:"normaluser"});
                next();
            }
            return res.status(402).json({mess:"unauthorized acces"});
        }catch(err){
            return res.json({mess:"internal error"});
        } 

}

module.exports={isLoggedIn};