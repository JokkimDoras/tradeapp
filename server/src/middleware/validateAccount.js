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
      success: false,
      message: "name account type currency must be provide",
    });
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

const validateDeleteAccount = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({
      success: false,
      message: "Illegal entry! Unauthorized invalid token",
    });
  }

  const token = authHeader.split(" ")[1];
  const accountId = req.params.id;

  try {
    const { data:{user},error:userError} = await supabaseAdmin.auth.getUser(token);

    if(userError || !user) {
        return res.status(400).json({
            success:false,
            message:'Cant get the user info',
            userError
        })
    }

    const { data: account, error } = await supabaseAdmin
      .from("accounts")
      .select("user_id")
      .eq("id", accountId)
      .single()

    if (error || !account) {
      return res.status(404).json({ message: "Account not found." });
    }

    if (account.user_id !== user.id) {
      return res
        .status(403)
        .json({ message: "Forbidden: You do not own this account." });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(400).json({
      success:false,
      message:'Failed to validate account',
      error:err
    })
  }
};

const validategetAccount = async(req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({
            success:false,
            message:'Unauthorized Invaild Token'
        })
    }

    const token = authHeader.split(' ')[1];
  
    try{
        const { data:{user},error } = await supabaseAdmin.auth.getUser(token);

        if(error || !user){
            return res.status(400).json({
                success:false,
                message:'Failed to get user info',
                error
            })
        }

        req.user = user;

        next();

    }catch(err){

        return res.status(400).json({
            success:false,
            message:'Something went wrong',
            error:err
        })

    }
}

const validategetParticularAccount = async(req,res,next) => {

  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({
      success:false,
      message:'Unauthorized Invaild Token'
    })
  }

  const token = authHeader.split(' ')[1];
  const account_id = req.params.id
try{
  const { data:{user},error:userError } = await supabaseAdmin.auth.getUser(token);

  if(userError || !user){
    return res.status(401).json({
      success:false,
      message:'Unauthorized Invalid Token'
    })
  }

  const { data , error:dbError } = await supabaseAdmin
  .from('accounts')
  .select('*')
  .eq('id',account_id)
  .eq('user_id',user.id)
  .single();

  if (dbError || !data) {
    return res.status(403).json({ 
      success:false,
      message: 'Forbidden: You do not have access to this account' ,
      error:dbError
    });
  }

  req.user = user;
  req.accountId = account_id;

  next()
}catch(err){
    return res.status(500).json({
      success:false,
      message:'Internal Server Error',
      error:err
    })
}



}

module.exports = { validateCreateAccount, validateDeleteAccount,validategetAccount,validategetParticularAccount  };
