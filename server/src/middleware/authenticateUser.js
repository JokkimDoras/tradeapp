const { supabase } = require('../config/supabase') 

const validateGetUser = async(req,res,next) => {

  const authHeader = req.headers.authorization
  if(!authHeader || !authHeader.startsWith('Bearer')){
    return res.status(401).json({
      success:false,
      message:'Unauthorized Invaid token'
    })
  }
  const token = authHeader.split(' ')[1]
  try{
    const {data,error} = await supabase.auth.getUser(token);
    if(error || !data){
      return res.status(401).json({
        success:false,
        message:'Unauthorized Invaild Token',
        error
      })
    }
    req.user_id = data.user.id
    next()
  }catch(err){
    console.log(err)
    return res.status(400).json({
      success:false,
      message:'Internal server Error',
      err
    })
  }

}

const authenticatUser = async(req,res,next) => {
    const value = req.headers.authorization;
    const {
        fullname,
        bio,
        country,
        account_currency,
        default_lot_size,
        risk_per_trade,
        trading_experience,
        timezone
      } = req.body;

    if (!fullname && !bio && !country && !account_currency && !default_lot_size && !risk_per_trade && !trading_experience && !timezone ) {
        return res.status(400).json({
          success: false,
          message: 'At least one field should be provided'
        });
      }
    if(!value || !value.startsWith('Bearer')){
        return res.status(400).json(
            {success:false,message:'Unauthorized request no token found'}
        )
        
    }
    const token = value.split(' ')[1]

    const { data:{user},error } = await supabase.auth.getUser(token)



    if(error || !user){
        return res.status(401).json({success:false,message:'Unauthorized:Invalid token'})
    }
    req.user = user
    
    next()
}

module.exports = {
  authenticatUser,
  validateGetUser,
};