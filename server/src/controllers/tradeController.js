const { supabaseAdmin } = require("../config/supabase");

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
      .json(
        { success: true, message: "Fetch the trade table succesfully",data }
      );
  } catch (err) {
    console.log(err)
    return res.status(400).json({
        success:false,
        message:'Faied',
        err
    })
  }
};

const addTrade = async (req, res) => {
  const userId = req.userId;
  const dbPayload = {
    user_id: userId,
    ...req.body,
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

const deleteTrade = async(req,res) => {

}

module.exports = { addTrade,getTrade ,deleteTrade};
