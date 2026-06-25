const { supabaseAdmin } = require("../config/supabase");
const {
  calculatePerformanceMetrics,
  calculateTradeMetrics,
} = require("../services/analyticsService");

const getTrade = async (req, res) => {
  const user_id = req.user_id;
  const account_id = req.account_id;

  try {
    const { data, error } = await supabaseAdmin
      .from("trades")
      .select("*")
      .eq("user_id", user_id)
      .eq("account_id", account_id);
    if (error || !data)
      return res
        .status(400)
        .json({ success: false, message: "Failed to get user Trade Info" });
    return res.status(200).json({
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

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_ANON_KEY
);


const deleteTrade = async (req, res) => {
  const tradeId = req.params.id;
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

const getTradingAnalytics = async (req, res) => {
  const account_id = req.params.id
  const user_id = req.user_id;

  try {
    const { data: trade, error: tradeError } = await supabaseAdmin
      .from("trades")
      .select("*")
      .eq("user_id", user_id)
      .eq("account_id", account_id);

    if (tradeError) {
      return res.status(400).json({
        success: false,
        message: "Trades not Found",
        tradeError: tradeError.message || tradeError,
      });
    }

    const performanceData = calculatePerformanceMetrics(trade || []);

    return res.status(200).json({
      success: true,
      message: "Success",
      data: performanceData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch Trade",
      err: err.message || err,
    });
  }
};

module.exports = {
  getTradingAnalytics,
};

module.exports = {
  addTrade,
  getTrade,
  deleteTrade,
  updateTrade,
  getTradingAnalytics,
  
};
