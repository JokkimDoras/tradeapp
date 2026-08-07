const { supabaseAdmin } = require("../config/supabase");

const validateNews = async(req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized Invalid Token'
        })
    }

    const token = authHeader.split(' ')[1];
    try{
         const {data:{user},error} = await supabaseAdmin.auth.getUser(token);

         if(error || !user) {
            return res.status(400).json({
                success:false,
                message:'User not Found',
                error
            })
         }
    }catch(err) {
          return res.status(500).json({
            success:false,
            message:'Something went wrong while get the user',
            err
          })
    }
    next()


}

module.exports = { validateNews }