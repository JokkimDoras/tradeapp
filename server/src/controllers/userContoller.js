const { supabase } = require("../config/supabase");

const sayHello = (req, res) => {
  res.status(200).json({
    message: "from frustration",
  });
};

const updateUser = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("USER ID:", req.user.id);

    const { data, error } = await supabase
      .from("users")
      .update(req.body)
      .eq("id", req.user.id)
      .select()
      .single();

    if (error) {
      console.error("SUPABASE ERROR:", error);

      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data,
    });
  } catch (err) {
    console.error("UPDATE USER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  sayHello,
  updateUser,
};