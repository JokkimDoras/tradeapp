const { supabaseAdmin } = require("../config/supabase");

const validateCreateAccount = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorization Invaid Token",
    });
  }

  const { name, account_type, currency } = req.body;

  if (!name || !account_type || !currency) {
    return res.status(400).json({
        success:false,
        message:'name account type currency must be provide'
    })
  }

  const token = authHeader.split(" ")[1];

  try {
    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return res.status(400).json({
        success: false,
        message: "Failed to get user info and id",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to get user info",
      error,
    });
  }
};

const validateDeleteAccount = (req,res,next) => {

}

module.exports = { validateCreateAccount,validateDeleteAccount };
