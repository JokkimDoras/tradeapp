const {supabase} = require('../config/supabase')
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
    req.token = token

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
    next()
  } catch (err) {
    return res.status(500).json({
        success:false,
        message:'Internal server error during trade validation'
    })
  }
};

module.exports = { validateAddTrade };
