const { supabase, supabaseAdmin } = require("../config/supabase");
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
      if (exit_price === undefined || exit_price === null) {
        return res.status(400).json({
          success: false,
          message: "A closed trade must include exit_price.",
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
        error,
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

const validateDeleteTrade = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized Invalid Token",
    });
  }
  const token = authHeader.split(" ")[1];

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Invaild Token",
      });
    }
    const tradeID = req.params.id;
    const { data: trade, error: dbError } = await supabaseAdmin
      .from("trades")
      .select("user_id")
      .eq("id", tradeID)
      .single();

    if (dbError || !trade) {
      return res.status(444).json({
        success: false,
        message: "Trade not Found",
        dbError,
      });
    }

    if (trade.user_id !== user.id) {
      return res.status(404).json({
        success: false,
        message: "You Dont Acces to Delete this Trade",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unauthorized Invaild Token",
    });
  }
};

const validateUpdateTrade = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid Token",
    });
  }

  const token = authHeader.split(" ")[1];
  const tradeID = req.params.id;

  try {
    const { data, error: authError } = await supabaseAdmin.auth.getUser(token);
    if (authError || !data?.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Cant get the user info",
        error: authError,
      });
    }

    const user = data.user;

    const { data: trade, error: tradeError } = await supabaseAdmin
      .from("trades")
      .select("user_id")
      .eq("id", tradeID)
      .single();

    if (tradeError || !trade) {
      return res.status(400).json({
        success: false,
        message: "Cant get the trade info",
        tradeError,
      });
    }

    if (trade.user_id !== user.id) {
      return res.status(403).json({
        success: false,
        message: "You Dont Own this trade",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Oops Something went wrong",
      err: err.message || err,
    });
  }
};

const validateStats = async (req, res, next) => {
  // 1. Commented out the token extraction lines so Postman doesn't crash on missing headers
  // const authHeader = req.headers.authorization;
  // const token = authHeader.split(" ")[1];

  try {
    /* // 2. Commented out the Supabase authentication call during your testing phase
    const {
      data: { user },
      error: authError,
    } = await supabaseAdmin.auth.getUser(token);
    if (authError || !user) {
      return res.status(401).json({
        success: false,
        message: "User not found or session expired",
        authError,
      });
    }
    */

    // 3. Directly inject your test user UUID so the controller can fetch their trades

    //here is the test user id
    // req.user_id = '.....'
    
    // 4. Proceed straight to the controller
    next();

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed',
      err: err.message || err
    });
  }
};
module.exports = {
  validateAddTrade,
  validateGetTrade,
  validateDeleteTrade,
  validateUpdateTrade,
  validateStats,
};
