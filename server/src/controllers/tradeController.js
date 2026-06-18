const { supabaseAdmin, supabase } = require("../config/supabase");

  const calculateTradeMetrics = (trade) => {
    const { entry_price, exit_price, stop_loss, take_profit, trade_type, lot_size, currency_pair } = trade;
  
    let pips = null;
    let profit_loss = null;
    let risk_reward_ratio = null;
    let result = null;
  
    const isJpyPair = currency_pair?.includes("JPY");
    const pipMultiplier = isJpyPair ? 100 : 10000;
  
    if (entry_price && exit_price) {
      pips = trade_type === "buy"
        ? (exit_price - entry_price) * pipMultiplier
        : (entry_price - exit_price) * pipMultiplier;
  
      profit_loss = pips * lot_size * 10;
  
      if (profit_loss > 0) result = "win";
      else if (profit_loss < 0) result = "loss";
      else result = "breakeven";
    }
  
    if (entry_price && stop_loss && take_profit) {
      const risk = Math.abs(entry_price - stop_loss);
      const reward = Math.abs(take_profit - entry_price);
      risk_reward_ratio = risk > 0 ? reward / risk : null;
    }
  
    return {
      pips: pips !== null ? parseFloat(pips.toFixed(2)) : null,
      profit_loss: profit_loss !== null ? parseFloat(profit_loss.toFixed(2)) : null,
      risk_reward_ratio: risk_reward_ratio !== null ? parseFloat(risk_reward_ratio.toFixed(2)) : null,
      result,
    };
  };
const getTrade = async (req, res) => {
  const user_id = req.user_id;

  try {
    const { data, error } = await supabaseAdmin
      .from("trades")
      .select("*")
      .eq("user_id", user_id);
    if (error || !data)
      return res
        .status(400)
        .json({ success: false, message: "Failed to get user Trade Info" });
    return res
      .status(200)
      .json({
        success: true,
        message: "Fetch the trade table succesfully",
        data,
      });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Faied",
      err,
    });
  }
};

const addTrade = async (req, res) => {
  const userId = req.userId;
  const metrics = calculateTradeMetrics(req.body);

  const dbPayload = {
    user_id: userId,
    ...req.body,
    ...metrics,
  };
  console.log("METRICS CALCULATED:", metrics);
console.log("RAW BODY RECEIVED:", req.body);

  try {
    const { data, error } = await supabaseAdmin
      .from("trades")
      .insert([dbPayload])
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        message: "DataBase insert failed",
        error,
      });
    }

    return res.status(200).json({
      success: true,
      message: "successfully added new trade",
      data: data[0],
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Internal server Error",
    });
  }
};

const deleteTrade = async (req, res) => {
  const tradeId = req.params.id;
  console.log(tradeId);
  try {
    const { data, error } = await supabaseAdmin
      .from("trades")
      .delete()
      .eq("id", tradeId);

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Cant able to Delete",
        error,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Cant able to Delete",
      err,
    });
  }
};

const updateTrade = async (req, res) => {
  const tradeID = req.params.id;
  const updateData = req.body;
  const metrics = calculateTradeMetrics(updateData);

  try {
    const { data, error } = await supabaseAdmin
      .from("trades")
      .update({
        currency_pair: updateData.currency_pair,
        trade_type: updateData.trade_type,
        status: updateData.status,
        entry_price: updateData.entry_price,
        exit_price: updateData.exit_price,
        stop_loss: updateData.stop_loss,
        take_profit: updateData.take_profit,
        lot_size: updateData.lot_size,
        risk_percentage: updateData.risk_percentage,
        pips: metrics.pips,
        profit_loss: metrics.profit_loss,
        risk_reward_ratio: metrics.risk_reward_ratio,
        notes: updateData.notes,
      })
      .eq("id", tradeID)
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Failed to update trade record in Supabase",
        error,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Terminal Registry Updated Successfully",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error during update routine execution",
      error: err.message || err,
    });
  }
};

module.exports = { addTrade, getTrade, deleteTrade, updateTrade };