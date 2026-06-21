const { supabaseAdmin } = require('../config/supabase')
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
    const files = req.files;
  
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

  const validategetScreenshot = (req,res,next) => {

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

    req.tradeId = tradeId
    next();

  }
  


  module.exports = {
    validateaddScreenshot,
    validategetScreenshot
  }