const { supabase } = require('../config/supabase') 

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
    const token = value.split(' ')[1]

    if (!fullname && !bio && !country && !account_currency && !default_lot_size && !risk_per_trade && !trading_experience && !timezone ) {
        return res.status(400).json({
          success: false,
          message: 'At least one field should be provided'
        });
      }
      console.log(token)
    if(!value || !value.startsWith('Bearer')){
        return res.status(400).json(
            {success:false,message:'Unauthorized request no token found'}
        )
    }
    const { data:{user},error } = await supabase.auth.getUser(token)

console.log("USER:", user);
console.log("ERROR:", error);

    if(error || !user){
        return res.status(401).json({success:false,message:'Unauthorized:Invalid token'})
    }
    req.user = user
    
    next()
}

module.exports = authenticatUser;