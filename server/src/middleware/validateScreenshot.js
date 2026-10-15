const { supabaseAdmin } = require('../config/supabase')

const getOwnedTrade = async (tradeId, userId) => {
  const { data, error } = await supabaseAdmin
    .from('trades')
    .select('id')
    .eq('id', tradeId)
    .eq('user_id', userId)
    .single();

  return { trade: data, error };
};

const validateaddScreenshot = async (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid Token",
      });
    }
  
    const token = authHeader.split(" ")[1];
    const tradeID = req.params.id;
    const files = req.files || [];
  
    if (files && files.length > 0) {
      
      if (files.length > 3) {
        return res.status(400).json({
          success: false,
          message: "Maximum 3 screenshots allowed",
        });
      }
  
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      for (const file of files) {
        if (!allowedTypes.includes(file.mimetype)) {
          return res.status(400).json({
            success: false,
            message: `Invalid file type: ${file.originalname}. Only PNG and JPEG are allowed.`,
          });
        }
      }
    }
  
    try {
      const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
      if (error || !user) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: Invalid or expired Supabase session",
        });
      }

      const { trade, error: tradeError } = await getOwnedTrade(tradeID, user.id);
      if (tradeError || !trade) {
        return res.status(404).json({
          success: false,
          message: 'Trade not found or access denied',
        });
      }
  
      req.user = user;
      req.tradeId = tradeID;
  
      next();
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error during validation processing",
      });
    }
  };

  const validategetScreenshot = async (req,res,next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({
            success:false,
            message:'Unauthorized Invaild Token'
        })
    }
   
    const token  =  authHeader.split(' ')[1];
    const tradeId = req.params.id
    if(!token){
        return res.status(401).json({
            success:false,
            message:'Unauthorized Invaild Token'
        })
    }

    try {
      const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
      if (error || !user) {
        return res.status(401).json({ success: false, message: 'Unauthorized invalid token' });
      }

      const { trade, error: tradeError } = await getOwnedTrade(tradeId, user.id);
      if (tradeError || !trade) {
        return res.status(404).json({ success: false, message: 'Trade not found or access denied' });
      }

      req.user = user;
      req.tradeId = tradeId;
      next();
    } catch {
      return res.status(500).json({ success: false, message: 'Unable to validate screenshot access' });
    }

  }
  
  const validateDeleteScreenshot = async(req,res,next) => {
     
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){

         return res.status(401).json({
            success:false,
            message:'Unauthorized Invaild Token',
         })
    }

    const {id} = req.body;

    
    const token = authHeader.split(' ')[1];
    try{
        const { data:{user},error:authError } = await supabaseAdmin.auth.getUser(token);

        if(authError || !user){
            return res.status(400).json({
                success:false,
                message:'Invalid or expired session'
            });
        }
        const { data:screenshot,error} = await supabaseAdmin
    .from('trade_screenshots')
    .select('*')
    .eq('id',id)
     .single()

     if(error || !screenshot){
        return res.status(404).json({
            success: false,
            message: "Screenshot not found",
          });
     }

     if(screenshot.user_id !== user.id){
        return res.status(403).json({
          success: false,
          message: 'You do not have access to this screenshot',
        });
     }
        req.user = user;
        req.screenshot = screenshot;
        next()
    }catch(err){
        return res.status(500).json({
            success:false,
            message:'Internal Server Error during validation processing'
        })
    }
  }



  module.exports = {
    validateaddScreenshot,
    validategetScreenshot,
    validateDeleteScreenshot
  }
