const { supabaseAdmin } = require("../config/supabase");

const validateDeleteUser = async(req,res,next) => {
   const authHeader = req.headers.authorization;
//    const token = authHeader.split(' ')[1];

if(!authHeader || !authHeader.startsWith('Bearer')){
   return res.status(401).json({
      success:false,
      message:'Unauthorization Invalid Token'
   })
}

const token = authHeader.split(' ')[1];

try{
   const {data:{user},error} = await supabaseAdmin.auth.getUser(token)
   if(error || !user){
      return res.status(400).json({
         success:false,
         message:'Failed to get User info and id'
      })
   }
   req.user = user;
   next();
}catch(err){
    return res.status(400).json({
      success:false,
      message:"Failed to get user info",
      err
    })
}

}

module.exports ={validateDeleteUser}