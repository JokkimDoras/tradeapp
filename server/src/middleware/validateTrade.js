const { supabase } = require("../config/supabase");
const validateAddTrade = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Invalid or missing token format.",
    });
  }

  const token = authHeader.split(" ")[1];

  const {
    currency_pair,
    trade_type,
    status,
    entry_price,
    exit_price,
    stop_loss,
    take_profit,
    lot_size,
    risk_percentage,
    pips,
    notes,
  } = req.body;

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (!user || error) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Invalid or missing token format.",
      });
    }
    req.userId = user.id;
    req.token = token;

    if (!currency_pair || !trade_type || !status || !entry_price || !lot_size) {
      return res.status(400).json({
        success: false,
        message:
          "Missing mandatory field. Currency pair, trade type,status,entry price and lot size are required.",
      });
    }

    if (status.toLowerCase() === "closed") {
      if (
        exit_price === undefined ||
        exit_price === null ||
        pips === undefined ||
        pips === null
      ) {
        return res.status(400).json({
          success: false,
          message: "A closed trade must include exit_price and pips.",
        });
      }
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error during trade validation",
    });
  }
};

const validateGetTrade = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized Invaild token",
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);
    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Invalid token",
        error
      });
    }

    req.user_id = user.id;
    
    next();

  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Internal server Error",
    });
  }
};

const validateDeleteTrade = async(req,res,next) => {

  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith('Bearer')){
    return res.status(401).json({
      success:false,
      message:'Unauthorized Invalid Token'
    })
  }
  const token = authHeader.split(' ')[1]

  try{
  const { data:{user},error:authError } = await supabase.auth.getUser(token)

  if(authError || !user){
    return res.status(401).json({
      success:false,
      message:'Unauthorized Invaild Token'
    })
  }
const tradeID = req.params.id
  const {data:trade,error:dbError} = await supabase
  .from('trades')
  .select('user_id')
  .eq('id',tradeID)
  .single()

  if(dbError || !trade){
    return res.status(444).json({
      success:false,
      message:'Trade not Found'
    })
  }

  if(trade.user_id !== user.id ){
    return res.status(404).json({
      success:false,
      message:'You Dont Acces to Delte this Trade'
    })
  }
  next()


  }catch(err){
    console.log(err)
    return res.status(500).json({
      success:false,
      message:'Unauthorized Invaild Token'
    })

  }
  

}
module.exports = { validateAddTrade, validateGetTrade,validateDeleteTrade };
